"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface FluidInteractionProps {
  intensity?: number;
  viscosity?: number;
  dissipation?: number;
  color?: string;
  opacity?: number;
}

export function FluidInteraction({
  intensity = 0.5,
  viscosity = 0.98,
  dissipation = 0.99,
  color = "#ffffff",
  opacity = 0.2,
}: FluidInteractionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const velocityRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; prevX: number; prevY: number }>({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
  });
  const frameRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // 创建Three.js渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 设置相机和场景
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    // 创建渲染目标
    const createRenderTarget = () => {
      return new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
      });
    };

    targetRef.current = createRenderTarget();
    velocityRef.current = createRenderTarget();

    // 创建流体着色器材质
    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uVelocity: { value: null },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPrevMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uViscosity: { value: viscosity },
        uDissipation: { value: dissipation },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: opacity },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform sampler2D uVelocity;
        uniform vec2 uMouse;
        uniform vec2 uPrevMouse;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uIntensity;
        uniform float uViscosity;
        uniform float uDissipation;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;

        // 噪声函数
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = vUv;

          // 计算鼠标移动的矢量
          vec2 mouseVelocity = (uMouse - uPrevMouse) * uIntensity;

          // 计算当前点到鼠标位置的距离
          vec2 mousePos = uMouse / uResolution;
          float dist = distance(uv, mousePos);
          float strength = smoothstep(0.2, 0.0, dist);

          // 从上一帧获取速度
          vec2 vel = texture2D(uVelocity, uv).xy;

          // 添加鼠标力
          if (strength > 0.0) {
            vel += mouseVelocity * strength;
          }

          // 应用粘性和耗散
          vel *= uViscosity;

          // 添加基于噪声的环境流动
          float noiseTime = uTime * 0.1;
          float noiseValue = snoise(uv * 3.0 + vec2(noiseTime)) * 0.002;
          vel.x += noiseValue;
          vel.y += snoise(uv * 3.0 + vec2(noiseTime + 100.0)) * 0.002;

          // 采样上一帧的颜色
          vec4 color = texture2D(uTexture, uv - vel);
          color.rgb *= uDissipation; // 颜色耗散

          // 添加鼠标轨迹
          if (strength > 0.0) {
            color.rgb += uColor * strength * uOpacity;
          }

          gl_FragColor = color;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    // 创建渲染平面
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, fluidMaterial);
    scene.add(mesh);

    // 更新鼠标位置
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.prevX = mousePosRef.current.x;
      mousePosRef.current.prevY = mousePosRef.current.y;
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = window.innerHeight - e.clientY; // Y轴翻转
    };

    // 处理触摸事件
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current.prevX = mousePosRef.current.x;
        mousePosRef.current.prevY = mousePosRef.current.y;
        mousePosRef.current.x = e.touches[0].clientX;
        mousePosRef.current.y = window.innerHeight - e.touches[0].clientY; // Y轴翻转
      }
    };

    // 添加鼠标/触摸事件监听
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // 处理窗口大小变化
    const handleResize = () => {
      if (!rendererRef.current || !targetRef.current || !velocityRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      rendererRef.current.setSize(width, height);

      // 更新渲染目标
      targetRef.current.dispose();
      velocityRef.current.dispose();

      targetRef.current = createRenderTarget();
      velocityRef.current = createRenderTarget();

      // 更新着色器中的分辨率
      if (fluidMaterial.uniforms) {
        fluidMaterial.uniforms.uResolution.value.set(width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    // 动画循环
    const startTime = Date.now();
    const animate = () => {
      if (!rendererRef.current || !targetRef.current || !velocityRef.current) return;

      const time = (Date.now() - startTime) / 1000; // 转换为秒

      // 更新着色器中的时间和鼠标位置
      fluidMaterial.uniforms.uTime.value = time;
      fluidMaterial.uniforms.uMouse.value.set(
        mousePosRef.current.x,
        mousePosRef.current.y
      );
      fluidMaterial.uniforms.uPrevMouse.value.set(
        mousePosRef.current.prevX,
        mousePosRef.current.prevY
      );

      // 更新着色器中的纹理
      fluidMaterial.uniforms.uTexture.value = targetRef.current.texture;
      fluidMaterial.uniforms.uVelocity.value = velocityRef.current.texture;

      // 渲染到纹理
      const temp = targetRef.current;
      targetRef.current = velocityRef.current;
      velocityRef.current = temp;

      rendererRef.current.setRenderTarget(targetRef.current);
      rendererRef.current.render(scene, camera);

      // 渲染到屏幕
      rendererRef.current.setRenderTarget(null);
      rendererRef.current.render(scene, camera);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    setIsInitialized(true);

    // 保存对当前容器的引用，以便在清理函数中安全使用
    const currentContainer = containerRef.current;

    // 清理函数
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (rendererRef.current && currentContainer) {
        currentContainer.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (targetRef.current) {
        targetRef.current.dispose();
      }

      if (velocityRef.current) {
        velocityRef.current.dispose();
      }
    };
  }, [intensity, viscosity, dissipation, color, opacity]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: isInitialized ? 1 : 0 }}
    >
      {/* Three.js 将在这里添加canvas */}
    </div>
  );
}
