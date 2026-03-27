import React, { memo, useEffect, useRef, useState } from "react";

type PointCloud = Float32Array;

const PARTICLE_COUNT = 14000;
const STAGE_LABELS = ["Sphere", "DNA", "Cube", "Horse", "Face", "Monogram"] as const;
const STAGE_COUNT = STAGE_LABELS.length;

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function createSpherePositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const ratio = count === 1 ? 0.5 : index / (count - 1);
    const y = 1 - ratio * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = goldenAngle * index;

    positions[index * 3] = Math.cos(angle) * ringRadius * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(angle) * ringRadius * radius;
  }

  return positions;
}

function createDnaPositions(count: number, height: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const ratio = index / count;
    const loops = 3.25;
    const angle = ratio * Math.PI * 2 * loops;
    const y = (ratio - 0.5) * height;
    const strand = index % 2 === 0 ? 0 : Math.PI;
    const centerAngle = angle + strand;
    const localRadius = radius + Math.sin(ratio * Math.PI * 12) * 6;
    const randomA = pseudoRandom(index * 0.71 + 3.1);
    const randomB = pseudoRandom(index * 1.17 + 8.4);
    const randomC = pseudoRandom(index * 1.91 + 1.7);
    const tubeAngle = randomA * Math.PI * 2;
    const tubeRadius = 8 + randomB * 18;
    const normalX = Math.cos(centerAngle);
    const normalZ = Math.sin(centerAngle);
    const binormalX = -Math.sin(centerAngle);
    const binormalY = 0.42 + randomC * 0.35;
    const binormalZ = Math.cos(centerAngle);
    const centerX = normalX * localRadius;
    const centerZ = normalZ * localRadius;

    positions[index * 3] = centerX + normalX * Math.cos(tubeAngle) * tubeRadius + binormalX * Math.sin(tubeAngle) * tubeRadius * 0.55;
    positions[index * 3 + 1] = y + Math.sin(tubeAngle) * tubeRadius * binormalY;
    positions[index * 3 + 2] = centerZ + normalZ * Math.cos(tubeAngle) * tubeRadius + binormalZ * Math.sin(tubeAngle) * tubeRadius * 0.55;
  }

  return positions;
}

function createCubePositions(count: number, size: number) {
  const positions = new Float32Array(count * 3);
  const half = size / 2;
  const edges = [
    [[-half, -half, -half], [half, -half, -half]],
    [[half, -half, -half], [half, half, -half]],
    [[half, half, -half], [-half, half, -half]],
    [[-half, half, -half], [-half, -half, -half]],
    [[-half, -half, half], [half, -half, half]],
    [[half, -half, half], [half, half, half]],
    [[half, half, half], [-half, half, half]],
    [[-half, half, half], [-half, -half, half]],
    [[-half, -half, -half], [-half, -half, half]],
    [[half, -half, -half], [half, -half, half]],
    [[half, half, -half], [half, half, half]],
    [[-half, half, -half], [-half, half, half]],
  ];

  for (let index = 0; index < count; index += 1) {
    const randomA = pseudoRandom(index * 0.37 + 2.4);
    const randomB = pseudoRandom(index * 0.73 + 9.1);
    const randomC = pseudoRandom(index * 1.11 + 5.2);
    const randomD = pseudoRandom(index * 1.57 + 6.8);
    const useFace = randomA > 0.42;
      const thickness = 4 + randomD * 12;

    if (useFace) {
      const face = Math.floor(randomB * 6);
      const u = lerp(-half, half, randomC);
      const v = lerp(-half, half, randomD);
      const offset = (randomA - 0.5) * thickness;

      if (face === 0) {
        positions[index * 3] = half + offset;
        positions[index * 3 + 1] = u;
        positions[index * 3 + 2] = v;
      } else if (face === 1) {
        positions[index * 3] = -half + offset;
        positions[index * 3 + 1] = u;
        positions[index * 3 + 2] = v;
      } else if (face === 2) {
        positions[index * 3] = u;
        positions[index * 3 + 1] = half + offset;
        positions[index * 3 + 2] = v;
      } else if (face === 3) {
        positions[index * 3] = u;
        positions[index * 3 + 1] = -half + offset;
        positions[index * 3 + 2] = v;
      } else if (face === 4) {
        positions[index * 3] = u;
        positions[index * 3 + 1] = v;
        positions[index * 3 + 2] = half + offset;
      } else {
        positions[index * 3] = u;
        positions[index * 3 + 1] = v;
        positions[index * 3 + 2] = -half + offset;
      }
    } else {
      const edge = edges[index % edges.length];
      const t = (index / count) * 1.7 % 1;
      const wobble = Math.sin(index * 0.37) * 3.5;

      positions[index * 3] = lerp(edge[0][0], edge[1][0], t) + wobble + (randomB - 0.5) * thickness;
      positions[index * 3 + 1] = lerp(edge[0][1], edge[1][1], t) + Math.cos(index * 0.23) * 3 + (randomC - 0.5) * thickness;
      positions[index * 3 + 2] = lerp(edge[0][2], edge[1][2], t) + Math.sin(index * 0.31) * 3 + (randomD - 0.5) * thickness;
    }
  }

  return positions;
}

function normalizePointCloud(points: PointCloud, targetRadius: number) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let index = 0; index < points.length; index += 3) {
    const x = points[index];
    const y = points[index + 1];

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const scale = (targetRadius * 2) / Math.max(width, height);
  const normalized = new Float32Array(points.length);

  for (let index = 0; index < points.length; index += 3) {
    normalized[index] = (points[index] - centerX) * scale;
    normalized[index + 1] = (points[index + 1] - centerY) * scale;
    normalized[index + 2] = points[index + 2] * scale;
  }

  return normalized;
}

async function sampleLogoPositions(url: string, count: number, targetRadius: number) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    const svg = await response.text();
    if (!svg.includes("<svg")) throw new Error("Not an SVG");
    const image = new Image();

    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return createSpherePositions(count, targetRadius);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const sampled: number[] = [];
    const step = 4;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const pixelIndex = (y * width + x) * 4;
        const red = data[pixelIndex];
        const green = data[pixelIndex + 1];
        const blue = data[pixelIndex + 2];
        const alpha = data[pixelIndex + 3];
        const brightness = red + green + blue;

        if (alpha > 20 && brightness > 740) {
          sampled.push(x, y);
        }
      }
    }

    if (sampled.length === 0) {
      return createSpherePositions(count, targetRadius);
    }

    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const sourceIndex = (index % (sampled.length / 2)) * 2;
      const x = sampled[sourceIndex];
      const y = sampled[sourceIndex + 1];
      const jitterX = (Math.sin(index * 0.49 + 1.2) * 0.5) * 8;
      const jitterY = (Math.cos(index * 0.93 + 4.8) * 0.5) * 8;
      const depth = Math.sin(index * 0.31) * 10 + Math.cos(index * 0.17) * 7;

      positions[index * 3] = x + jitterX;
      positions[index * 3 + 1] = y + jitterY;
      positions[index * 3 + 2] = depth;
    }

    return normalizePointCloud(positions, targetRadius);
  } catch (error) {
    console.warn("Could not load logo, falling back to sphere", error);
    return createSpherePositions(count, targetRadius);
  }
}

function normalizeVectorCloud(points: Float32Array, targetRadius: number) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  for (let index = 0; index < points.length; index += 3) {
    minX = Math.min(minX, points[index]);
    maxX = Math.max(maxX, points[index]);
    minY = Math.min(minY, points[index + 1]);
    maxY = Math.max(maxY, points[index + 1]);
    minZ = Math.min(minZ, points[index + 2]);
    maxZ = Math.max(maxZ, points[index + 2]);
  }

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const centerZ = (minZ + maxZ) / 2;
  const size = Math.max(maxX - minX, maxY - minY, maxZ - minZ, 1);
  const scale = (targetRadius * 2) / size;
  const normalized = new Float32Array(points.length);

  for (let index = 0; index < points.length; index += 3) {
    normalized[index] = (points[index] - centerX) * scale;
    normalized[index + 1] = (points[index + 1] - centerY) * scale;
    normalized[index + 2] = (points[index + 2] - centerZ) * scale;
  }

  return normalized;
}

function samplePointsFromFlatArray(source: Float32Array | ArrayLike<number>, count: number, targetRadius: number) {
  const sampled = new Float32Array(count * 3);
  const sourceCount = Math.max(1, Math.floor(source.length / 3));

  for (let index = 0; index < count; index += 1) {
    const sourceIndex = (Math.floor((index / count) * sourceCount) % sourceCount) * 3;
    sampled[index * 3] = Number(source[sourceIndex]);
    sampled[index * 3 + 1] = Number(source[sourceIndex + 1]);
    sampled[index * 3 + 2] = Number(source[sourceIndex + 2]);
  }

  return normalizeVectorCloud(sampled, targetRadius);
}

function samplePointsFromSkinnedMesh(THREE: any, skinnedMesh: any, count: number, targetRadius: number) {
  const position = skinnedMesh.geometry.attributes.position;
  const sourceCount = position.count;
  const sampled = new Float32Array(count * 3);
  const temp = new THREE.Vector3();

  for (let index = 0; index < count; index += 1) {
    const vertexIndex = Math.floor((index / count) * sourceCount) % sourceCount;
    temp.fromBufferAttribute(position, vertexIndex);
    skinnedMesh.applyBoneTransform(vertexIndex, temp);
    temp.applyMatrix4(skinnedMesh.matrixWorld);

    sampled[index * 3] = temp.x;
    sampled[index * 3 + 1] = temp.y;
    sampled[index * 3 + 2] = temp.z;
  }

  return normalizeVectorCloud(sampled, targetRadius);
}

async function loadFacePositions(THREE: any, count: number, targetRadius: number) {
  try {
    const response = await fetch("/models/WaltHeadLo_buffergeometry.json");
    const json = await response.json();
    const loader = new THREE.BufferGeometryLoader();
    const geometry = loader.parse(json);
    const points = samplePointsFromFlatArray(geometry.attributes.position.array, count, targetRadius);
    geometry.dispose();
    return points;
  } catch (error) {
    console.warn("Could not load face geometry", error);
    return createSpherePositions(count, targetRadius);
  }
}

async function loadHorsePositions(THREE: any, GLTFLoader: any, count: number, targetRadius: number) {
  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync("/models/Horse.glb");
    const horse = gltf.scene.children[0];
    horse.scale.set(1.5, 1.5, 1.5);
    horse.updateMatrixWorld(true);

    const mixer = new THREE.AnimationMixer(horse);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    const sampleTimes = [0.05, 0.2, 0.38];
    const poses = sampleTimes.map((time: number) => {
      mixer.setTime(time);
      horse.updateMatrixWorld(true);
      return samplePointsFromSkinnedMesh(THREE, horse, count, targetRadius);
    });

    return poses;
  } catch (error) {
    console.warn("Could not load horse geometry", error);
    const fallback = createSpherePositions(count, targetRadius);
    return [fallback, fallback, fallback];
  }
}

const vertexShader = `
  attribute float aSize;
  attribute float aSeed;
  attribute float aGlow;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uAlpha;
  uniform float uIntensity;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.82 + 0.18 * sin(uTime * 1.6 + aSeed * 20.0);
    float depth = 1.0 / max(0.45, -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uScale * uPixelRatio * twinkle * uIntensity * (150.0 * depth);

    vAlpha = clamp((0.16 + aGlow * 0.7 + depth * 0.28) * uAlpha, 0.0, 1.0);
    vGlow = aGlow;
  }
`;

const fragmentShader = `
  precision highp float;
  varying float vAlpha;
  varying float vGlow;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    float body = smoothstep(0.56, 0.03, dist);
    float halo = smoothstep(0.76, 0.08, dist);
    float crystal = smoothstep(0.22, 0.0, dist);
    float alpha = mix(body, halo, vGlow) * vAlpha + crystal * vAlpha * 0.16;
    vec3 color = mix(uColorA, uColorB, vGlow * 0.6 + crystal * 0.2);

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

export const LogoMorphDemo = memo(function LogoMorphDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0.52);
  const displayProgressRef = useRef(0.52);
  const uiProgressRef = useRef(0.52);
  const lastUiCommitRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const [scrub, setScrub] = useState(0.52);
  const [status, setStatus] = useState("Loading WebGL scene...");
  const stageFloat = scrub * (STAGE_COUNT - 1);
  const activeFromStage = STAGE_LABELS[Math.floor(stageFloat)] ?? STAGE_LABELS[0];
  const activeToStage = STAGE_LABELS[Math.min(STAGE_LABELS.length - 1, Math.floor(stageFloat) + 1)] ?? STAGE_LABELS[0];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateProgress = (delta: number) => {
      const next = clamp(targetProgressRef.current + delta, 0, 1);
      targetProgressRef.current = next;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const cappedDelta = Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY), 26);
      updateProgress(cappedDelta * 0.00055);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchYRef.current == null) return;
      event.preventDefault();
      const currentY = event.touches[0]?.clientY ?? touchYRef.current;
      const delta = touchYRef.current - currentY;
      touchYRef.current = currentY;
      updateProgress(delta * 0.0018);
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchmove", onTouchMove, { passive: false });
    node.addEventListener("touchend", onTouchEnd);

    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchmove", onTouchMove);
      node.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let cleanup = () => {};

    const run = async () => {
      try {
        const THREE = await import(
          /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js"
        );
        const { GLTFLoader } = await import(
          /* @vite-ignore */ "https://esm.sh/three@0.161.0/examples/jsm/loaders/GLTFLoader?bundle"
        );

        if (cancelled) return;

        setStatus("Sampling shapes and building particle states...");

        const [sphere, dna, cube, logo, face, horsePoses] = await Promise.all([
          Promise.resolve(createSpherePositions(PARTICLE_COUNT, 170)),
          Promise.resolve(createDnaPositions(PARTICLE_COUNT, 430, 72)),
          Promise.resolve(createCubePositions(PARTICLE_COUNT, 270)),
          sampleLogoPositions("/ak_logo_clean.svg", PARTICLE_COUNT, 180),
          loadFacePositions(THREE, PARTICLE_COUNT, 170),
          loadHorsePositions(THREE, GLTFLoader, PARTICLE_COUNT, 165),
        ]);

        if (cancelled) return;

        const [horseA, horseB, horseC] = horsePoses;
        const horseAnimated = new Float32Array(PARTICLE_COUNT * 3);
        const stagePositions = [sphere, dna, cube, horseA, face, logo];
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 2000);
        camera.position.set(0, 0, 780);

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });

        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        const seeds = new Float32Array(PARTICLE_COUNT);
        const glows = new Float32Array(PARTICLE_COUNT);
        const shells = new Float32Array(PARTICLE_COUNT);
        const scatter = new Float32Array(PARTICLE_COUNT * 3);

        for (let index = 0; index < PARTICLE_COUNT; index += 1) {
          const base = index * 3;
          const seed = (Math.sin(index * 12.9898) + 1) * 0.5;
          sizes[index] = 0.3 + ((index * 17) % 23) / 23 * 1.5;
          seeds[index] = seed;
          glows[index] = 0.3 + (((index * 29) % 31) / 31) * 0.7;
          shells[index] = 0.35 + pseudoRandom(index * 0.63 + 9.7) * 0.9;

          scatter[base] = Math.sin(index * 0.13) * 85 + Math.cos(index * 0.021) * 42;
          scatter[base + 1] = Math.cos(index * 0.09) * 80 + Math.sin(index * 0.033) * 38;
          scatter[base + 2] = Math.sin(index * 0.07) * 95;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        geometry.setAttribute("aGlow", new THREE.BufferAttribute(glows, 1));

        const baseMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
            uScale: { value: 1 },
            uAlpha: { value: 0.82 },
            uIntensity: { value: 1.05 },
            uColorA: { value: new THREE.Color("#fff8f1") },
            uColorB: { value: new THREE.Color("#ffd9ba") },
          },
          vertexShader,
          fragmentShader,
        });

        const glowMaterial = baseMaterial.clone();
        glowMaterial.uniforms = THREE.UniformsUtils.clone(baseMaterial.uniforms);
        glowMaterial.uniforms.uScale.value = 2.8;
        glowMaterial.uniforms.uAlpha.value = 0.16;
        glowMaterial.uniforms.uIntensity.value = 1.45;
        glowMaterial.uniforms.uColorA.value = new THREE.Color("#fff6ed");
        glowMaterial.uniforms.uColorB.value = new THREE.Color("#ffbf8d");

        const mistMaterial = baseMaterial.clone();
        mistMaterial.uniforms = THREE.UniformsUtils.clone(baseMaterial.uniforms);
        mistMaterial.uniforms.uScale.value = 5.2;
        mistMaterial.uniforms.uAlpha.value = 0.045;
        mistMaterial.uniforms.uIntensity.value = 1.75;
        mistMaterial.uniforms.uColorA.value = new THREE.Color("#fff1e4");
        mistMaterial.uniforms.uColorB.value = new THREE.Color("#ffb170");

        const points = new THREE.Points(geometry, baseMaterial);
        const glowPoints = new THREE.Points(geometry, glowMaterial);
        const mistPoints = new THREE.Points(geometry, mistMaterial);
        scene.add(mistPoints);
        scene.add(glowPoints);
        scene.add(points);

        const ambient = new THREE.AmbientLight(0xffffff, 0.55);
        scene.add(ambient);

        mount.innerHTML = "";
        mount.appendChild(renderer.domElement);

        const resize = () => {
          const width = mount.clientWidth;
          const height = mount.clientHeight;

          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(1, height);
          camera.updateProjectionMatrix();
          baseMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
          glowMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
        };

        resize();
        window.addEventListener("resize", resize);

        let frame = 0;

        const render = (time: number) => {
          if (cancelled) return;

          frame = requestAnimationFrame(render);

          const idleOffset = Math.sin(time * 0.00055) * 0.012;
          const smoothing = 0.14;
          displayProgressRef.current = lerp(displayProgressRef.current, targetProgressRef.current, smoothing);
          const progress = clamp(displayProgressRef.current + idleOffset, 0, 0.9999);

          if (Math.abs(progress - uiProgressRef.current) > 0.003 || time - lastUiCommitRef.current > 80) {
            uiProgressRef.current = progress;
            lastUiCommitRef.current = time;
            setScrub(progress);
          }

          const stageFloat = progress * (STAGE_COUNT - 1);
          const fromStage = Math.floor(stageFloat);
          const toStage = Math.min(STAGE_COUNT - 1, fromStage + 1);
          const localProgress = smoothstep(stageFloat - fromStage);
          const chaosPeak = Math.sin(localProgress * Math.PI);
          const morphChaos = Math.pow(Math.max(0, chaosPeak), 2.0) * 0.42;
          let from = stagePositions[fromStage];
          let to = stagePositions[toStage];

          if (fromStage === 3 || toStage === 3) {
            const horseCycle = (Math.sin(time * 0.0022) + 1) * 0.5;
            const poseBlend = horseCycle < 0.5 ? smoothstep(horseCycle * 2) : smoothstep((horseCycle - 0.5) * 2);
            const horseFrom = horseCycle < 0.5 ? horseA : horseB;
            const horseTo = horseCycle < 0.5 ? horseB : horseC;

            for (let index = 0; index < horseAnimated.length; index += 1) {
              horseAnimated[index] = lerp(horseFrom[index], horseTo[index], poseBlend);
            }

            if (fromStage === 3) {
              from = horseAnimated;
            }

            if (toStage === 3) {
              to = horseAnimated;
            }
          }

          for (let index = 0; index < PARTICLE_COUNT; index += 1) {
            const base = index * 3;
            const shell = shells[index];
            const chaosScale = 12 + glows[index] * 22;
            const swirl = time * 0.00035 + seeds[index] * Math.PI * 2;
            const swirlX = Math.cos(swirl + index * 0.0009) * chaosScale;
            const swirlY = Math.sin(swirl * 1.4 + index * 0.0007) * chaosScale;
            const swirlZ = Math.sin(swirl * 0.7 + index * 0.0011) * chaosScale * 1.4;
            const microDrift = Math.sin(time * 0.0013 + index * 0.17) * 1.4 * shell;
            const scatterAmount = morphChaos * (0.25 + seeds[index] * 0.8);

            positions[base] =
              lerp(from[base], to[base], localProgress) +
              (scatter[base] * 0.22 + swirlX) * scatterAmount +
              Math.cos(swirl * 1.7) * microDrift;

            positions[base + 1] =
              lerp(from[base + 1], to[base + 1], localProgress) +
              (scatter[base + 1] * 0.22 + swirlY) * scatterAmount +
              Math.sin(swirl * 1.9) * microDrift;

            positions[base + 2] =
              lerp(from[base + 2], to[base + 2], localProgress) +
              (scatter[base + 2] * 0.18 + swirlZ) * scatterAmount +
              Math.sin(swirl * 1.2) * microDrift * 1.4;
          }

          geometry.attributes.position.needsUpdate = true;
          points.rotation.y = time * 0.00022;
          glowPoints.rotation.y = time * 0.00022;
          mistPoints.rotation.y = time * 0.00019;
          points.rotation.x = Math.sin(time * 0.00017) * 0.15;
          glowPoints.rotation.x = points.rotation.x;
          mistPoints.rotation.x = points.rotation.x * 0.9;
          points.rotation.z = Math.sin(time * 0.00011) * 0.08;
          glowPoints.rotation.z = points.rotation.z;
          mistPoints.rotation.z = points.rotation.z * 0.75;

          baseMaterial.uniforms.uTime.value = time * 0.001;
          glowMaterial.uniforms.uTime.value = time * 0.001;
          mistMaterial.uniforms.uTime.value = time * 0.001;

          renderer.render(scene, camera);
        };

        frame = requestAnimationFrame(render);
        setStatus("WebGL scene ready");

        cleanup = () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("resize", resize);
          geometry.dispose();
          baseMaterial.dispose();
          glowMaterial.dispose();
          mistMaterial.dispose();
          renderer.dispose();
          mount.innerHTML = "";
        };
      } catch (error) {
        console.error(error);
        setStatus("WebGL scene failed to load");
      }
    };

    run();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden touch-none select-none"
      style={{ overscrollBehavior: "none" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(255,183,112,0.16),transparent_18%),radial-gradient(circle_at_50%_46%,rgba(247,6,112,0.10),transparent_34%)]" />

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-start justify-between px-2 py-2 md:px-4 md:py-4">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.42em] text-brand-pink/80">Three.js Morph Demo</p>
          <h3 className="max-w-xl text-xl font-black tracking-tight text-white md:text-3xl">
            Scroll or swipe to morph the particle sculpture.
          </h3>
        </div>

        <div className="rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Progress</p>
          <p className="mt-2 text-sm text-white/70">{Math.round(scrub * 100)}%</p>
          <p className="mt-1 text-xs text-white/45">
            {status === "WebGL scene ready" ? `${activeFromStage} -> ${activeToStage}` : status}
          </p>
        </div>
      </div>

      <div
        ref={mountRef}
        className="absolute inset-0"
      />

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 w-[min(88vw,820px)] -translate-x-1/2 md:bottom-8">
        <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F70670] via-[#ff8d68] to-white transition-[width] duration-150"
            style={{ width: `${Math.max(6, scrub * 100)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/34">
          <span>{activeFromStage}</span>
          <span>Scroll / Swipe</span>
          <span>{activeToStage}</span>
        </div>
      </div>
    </div>
  );
});
