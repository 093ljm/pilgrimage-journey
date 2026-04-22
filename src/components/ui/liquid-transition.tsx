"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface LiquidTransitionProps {
  isActive: boolean;
  onTransitionComplete?: () => void;
  color?: string;
  duration?: number;
}

export function LiquidTransition({
  isActive,
  onTransitionComplete,
  color = "#000",
  duration = 1.2,
}: LiquidTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const timeRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化Three.js场景
  useEffect(() => {
    if (!containerRef.current) return;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 创建正交相机
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-1, 1, 1 / aspect, -1 / aspect, 0, 2);
    camera.position.z = 1;
    cameraRef.current = camera;

    // 创建着色器材质 - 使用更简单的径向渐变效果
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uProgress: { value: 0.0 },
        uDirection: { value: 1 }, // 1 for entering, -1 for exiting
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uSmooth: { value: 0.4 }, // 平滑边缘程度
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform vec3 uColor;
        uniform int uDirection;
        uniform vec2 uResolution;
        uniform float uSmooth;
        varying vec2 vUv;

        const float PI = 3.141592653589793;

        // 扰动函数
        float distort(vec2 uv, float progress) {
          float aspect = uResolution.x / uResolution.y;
          vec2 center = vec2(0.5, 0.5);

          // 计算到中心点的距离
          vec2 adjustedUV = vec2(uv.x, uv.y / aspect) * 2.0 - 1.0;
          float dist = length(adjustedUV) * 0.5;

          // 使用正弦函数添加波浪
          float wave = sin(dist * 10.0 + uTime * 2.0) * 0.05 * progress;

          // 创建径向渐变，带波浪扰动
          float circle = smoothstep(progress + wave, progress + uSmooth + wave, dist);

          return (uDirection > 0) ? 1.0 - circle : circle;
        }

        void main() {
          // 应用渐变效果
          float alpha = distort(vUv, uProgress);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
    });
    materialRef.current = material;

    // 创建平面几何体
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 处理窗口大小变化
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !materialRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      rendererRef.current.setSize(width, height);

      const aspect = width / height;
      cameraRef.current.top = 1 / aspect;
      cameraRef.current.bottom = -1 / aspect;
      cameraRef.current.updateProjectionMatrix();

      materialRef.current.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);
    setIsInitialized(true);

    // 保存当前容器的引用，避免在清理函数中使用可能已经变化的引用
    const currentContainer = containerRef.current;

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && currentContainer) {
        currentContainer.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color]);

  // 处理动画效果
  useEffect(() => {
    if (!isInitialized) return;

    let startTime = 0;
    const targetProgress = isActive ? 1.0 : 0.0;
    const startProgress = isActive ? 0.0 : 1.0;
    isTransitioningRef.current = true;

    // 更新进入/退出方向
    if (materialRef.current) {
      materialRef.current.uniforms.uDirection.value = isActive ? 1 : -1;
    }

    const animate = (time: number) => {
      if (!materialRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      if (startTime === 0) {
        startTime = time;
      }

      const elapsedTime = (time - startTime) / 1000; // 转换为秒
      const progress = Math.min(elapsedTime / duration, 1.0);

      // 使用缓动函数使过渡更加流畅
      const easedProgress = isActive
        ? easeOutCubic(progress)
        : 1 - easeOutCubic(1 - progress);

      // 更新着色器中的时间和进度
      timeRef.current = time / 1000;
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uProgress.value = startProgress + (targetProgress - startProgress) * easedProgress;

      // 渲染场景
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      if (progress < 1.0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        isTransitioningRef.current = false;
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isInitialized, duration, onTransitionComplete]);

  return (
    <div
      ref={containerRef}
      className={`liquid-transition-container ${isActive ? 'active' : ''}`}
      style={{ opacity: isInitialized ? 1 : 0 }}
    >
      {/* Three.js会将canvas添加到这里 */}
    </div>
  );
}

// 缓动函数 - 更平滑的动画曲线
function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}
