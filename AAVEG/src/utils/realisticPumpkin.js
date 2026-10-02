import * as THREE from 'three';

/**
 * Realistic 3D Procedural Pumpkin Engine
 *
 * Generates an authentic, ribbed 3D Jack-o'-Lantern model with:
 * - Parametric 3D BufferGeometry: 10 vertical sinusoidal lobes with realistic furrow depth,
 *   squashed spheroid proportions, and realistic top & bottom dimple depressions.
 * - Organic PBR Textures: High-resolution procedural canvas textures for color, bump,
 *   roughness, and emissive carving with glowing candlelit interior.
 * - Gnarled Woody Stem: Curved, faceted fibrous stem with flared root attachment.
 * - Real-time Inner Flame Point Light: Organic candle flicker illuminating surrounding mist & ground.
 */

// Cached textures to prevent redundant canvas operations and GPU memory leaks
let cachedTextures = null;

export function getPumpkinTextures() {
  if (cachedTextures) return cachedTextures;

  const width = 1024;
  const height = 512;

  // 1. Diffuse / Color Map
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d');

  // Base vertical gradient from top dimple to base
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#561d02');     // Dark mossy umber top dimple
  baseGrad.addColorStop(0.12, '#a73703');  // Upper shoulder
  baseGrad.addColorStop(0.45, '#d9530b');  // Vibrant warm pumpkin orange belly
  baseGrad.addColorStop(0.82, '#b23d04');  // Lower curve
  baseGrad.addColorStop(1, '#461501');     // Dark earth bottom dimple
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // Rib Furrow Shading (10 vertical crevices)
  const numRibs = 10;
  for (let i = 0; i < numRibs; i++) {
    const cx = (i / numRibs) * width;
    const furrowGrad = ctx.createLinearGradient(cx - 24, 0, cx + 24, 0);
    furrowGrad.addColorStop(0, 'rgba(0,0,0,0)');
    furrowGrad.addColorStop(0.5, 'rgba(38, 10, 2, 0.65)'); // Deep shadow in the groove
    furrowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = furrowGrad;
    ctx.fillRect(cx - 24, 0, 48, height);

    // Subtle golden highlight on the crest of each rib lobe
    const crestX = ((i + 0.5) / numRibs) * width;
    const crestGrad = ctx.createLinearGradient(crestX - 28, 0, crestX + 28, 0);
    crestGrad.addColorStop(0, 'rgba(255, 140, 40, 0)');
    crestGrad.addColorStop(0.5, 'rgba(255, 150, 50, 0.18)');
    crestGrad.addColorStop(1, 'rgba(255, 140, 40, 0)');
    ctx.fillStyle = crestGrad;
    ctx.fillRect(crestX - 28, 0, 56, height);
  }

  // Organic vertical skin striations / fibers
  ctx.fillStyle = 'rgba(70, 18, 2, 0.15)';
  for (let x = 0; x < width; x += 2) {
    if (Math.sin(x * 13.7) > 0.1) {
      ctx.fillRect(x, 0, 1.2, height);
    }
  }

  // Subtle organic mottling / pores
  for (let p = 0; p < 800; p++) {
    const px = Math.random() * width;
    const py = Math.random() * height;
    const pr = Math.random() * 2.5 + 0.8;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(50, 15, 0, 0.15)' : 'rgba(255, 180, 80, 0.12)';
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
  }

  // -------------------------------------------------------------
  // 2. Carved Jack-o'-Lantern Face (Centered at u = 0.5)
  // -------------------------------------------------------------
  // Front center is at x = width * 0.5 = 512
  const centerX = width * 0.5;
  const centerY = height * 0.54;

  const drawFace = (targetCtx, isEmissive = false) => {
    // Helpers
    const leftEye = [
      { x: centerX - 82, y: centerY - 58 },
      { x: centerX - 24, y: centerY - 28 },
      { x: centerX - 42, y: centerY + 18 },
      { x: centerX - 94, y: centerY - 12 },
    ];

    const rightEye = [
      { x: centerX + 82, y: centerY - 58 },
      { x: centerX + 24, y: centerY - 28 },
      { x: centerX + 42, y: centerY + 18 },
      { x: centerX + 94, y: centerY - 12 },
    ];

    const nose = [
      { x: centerX, y: centerY - 6 },
      { x: centerX - 22, y: centerY + 30 },
      { x: centerX + 22, y: centerY + 30 },
    ];

    const mouth = [
      { x: centerX - 120, y: centerY + 58 },
      { x: centerX - 80, y: centerY + 82 },
      { x: centerX - 60, y: centerY + 65 },
      { x: centerX - 35, y: centerY + 92 },
      { x: centerX, y: centerY + 68 },
      { x: centerX + 35, y: centerY + 92 },
      { x: centerX + 60, y: centerY + 65 },
      { x: centerX + 80, y: centerY + 82 },
      { x: centerX + 120, y: centerY + 58 },
      { x: centerX + 95, y: centerY + 115 },
      { x: centerX + 55, y: centerY + 128 },
      { x: centerX, y: centerY + 108 },
      { x: centerX - 55, y: centerY + 128 },
      { x: centerX - 95, y: centerY + 115 },
    ];

    const fillPolygon = (pts, style) => {
      targetCtx.beginPath();
      targetCtx.moveTo(pts[0].x, pts[0].y);
      for (let k = 1; k < pts.length; k++) {
        targetCtx.lineTo(pts[k].x, pts[k].y);
      }
      targetCtx.closePath();
      targetCtx.fillStyle = style;
      targetCtx.fill();
    };

    if (!isEmissive) {
      // 1. Carved Rind Bevel (Pale yellow-orange exposed pumpkin flesh)
      targetCtx.lineWidth = 10;
      targetCtx.strokeStyle = '#ffd269';
      targetCtx.lineJoin = 'miter';

      [leftEye, rightEye, nose, mouth].forEach((pts) => {
        targetCtx.beginPath();
        targetCtx.moveTo(pts[0].x, pts[0].y);
        for (let k = 1; k < pts.length; k++) {
          targetCtx.lineTo(pts[k].x, pts[k].y);
        }
        targetCtx.closePath();
        targetCtx.stroke();
      });

      // 2. Inner Hollow Cavity (Dark void with burning core)
      [leftEye, rightEye, nose, mouth].forEach((pts) => {
        fillPolygon(pts, '#160501');
      });
    } else {
      // Emissive Map: Glowing fiery incandescent flame
      targetCtx.shadowColor = '#ff4400';
      targetCtx.shadowBlur = 24;

      const flameGrad = targetCtx.createRadialGradient(
        centerX, centerY + 30, 10,
        centerX, centerY + 30, 160
      );
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.2, '#fff285');
      flameGrad.addColorStop(0.55, '#ff7300');
      flameGrad.addColorStop(1, '#ff2200');

      [leftEye, rightEye, nose, mouth].forEach((pts) => {
        fillPolygon(pts, flameGrad);
      });
    }
  };

  // Draw face onto diffuse
  drawFace(ctx, false);

  // -------------------------------------------------------------
  // 3. Emissive Texture Map (pure black with fiery cuts)
  // -------------------------------------------------------------
  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const eCtx = emissiveCanvas.getContext('2d');
  eCtx.fillStyle = '#000000';
  eCtx.fillRect(0, 0, width, height);
  drawFace(eCtx, true);

  // -------------------------------------------------------------
  // 4. Bump Texture Map (crevices indented, carved cuts sharp)
  // -------------------------------------------------------------
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');
  bCtx.fillStyle = '#808080'; // Neutral 50% gray
  bCtx.fillRect(0, 0, width, height);

  // Rib bump contours
  for (let i = 0; i < numRibs; i++) {
    const cx = (i / numRibs) * width;
    const furrowBump = bCtx.createLinearGradient(cx - 20, 0, cx + 20, 0);
    furrowBump.addColorStop(0, '#808080');
    furrowBump.addColorStop(0.5, '#353535'); // Deep indentation
    furrowBump.addColorStop(1, '#808080');
    bCtx.fillStyle = furrowBump;
    bCtx.fillRect(cx - 20, 0, 40, height);

    const crestX = ((i + 0.5) / numRibs) * width;
    const crestBump = bCtx.createLinearGradient(crestX - 25, 0, crestX + 25, 0);
    crestBump.addColorStop(0, '#808080');
    crestBump.addColorStop(0.5, '#a5a5a5'); // Elevated crest
    crestBump.addColorStop(1, '#808080');
    bCtx.fillStyle = crestBump;
    bCtx.fillRect(crestX - 25, 0, 50, height);
  }

  // Fine fiber bump lines
  bCtx.fillStyle = '#656565';
  for (let x = 0; x < width; x += 4) {
    if (Math.sin(x * 9.1) > 0.3) {
      bCtx.fillRect(x, 0, 1, height);
    }
  }

  // Create Three.js Textures
  const colorTexture = new THREE.CanvasTexture(colorCanvas);
  colorTexture.wrapS = THREE.RepeatWrapping;
  colorTexture.wrapT = THREE.ClampToEdgeWrapping;

  const emissiveTexture = new THREE.CanvasTexture(emissiveCanvas);
  emissiveTexture.wrapS = THREE.RepeatWrapping;
  emissiveTexture.wrapT = THREE.ClampToEdgeWrapping;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  cachedTextures = {
    colorTexture,
    emissiveTexture,
    bumpTexture,
  };

  return cachedTextures;
}

/**
 * Creates an authentic 3D Pumpkin BufferGeometry with 10 ribbed lobes,
 * squashed vertical proportions, and top/bottom stem & ground dimples.
 */
export function createRealisticPumpkinGeometry(radius = 1.0, radialSegments = 54, heightSegments = 30) {
  const geom = new THREE.BufferGeometry();

  const vertices = [];
  const uvs = [];
  const indices = [];

  const hRatio = 0.78; // Squashed pumpkin height
  const numRibs = 10;
  const ribAmp = 0.155; // Bulge depth of lobes

  for (let j = 0; j <= heightSegments; j++) {
    const v = j / heightSegments; // 0 (top pole) to 1 (bottom pole)
    const phi = v * Math.PI;

    // Base horizontal radius profile along height
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    // Top and bottom inward dimples
    let dimpleY = 0;
    if (phi < 0.38) {
      // Top stem depression
      const tTop = 1.0 - phi / 0.38;
      dimpleY = -0.22 * Math.pow(tTop, 2.2) * radius;
    } else if (phi > Math.PI - 0.35) {
      // Bottom blossom dimple
      const tBot = 1.0 - (Math.PI - phi) / 0.35;
      dimpleY = 0.16 * Math.pow(tBot, 2.0) * radius;
    }

    const y = (hRatio * cosPhi * radius) + dimpleY;

    // Belly wider in the lower middle
    const bellyScale = 1.0 + 0.14 * Math.pow(sinPhi, 1.4);
    const rBase = sinPhi * radius * bellyScale;

    // Fade rib amplitude smoothly near the poles to meet stem cleanly
    const ribFade = Math.pow(sinPhi, 0.55);

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      // Center u = 0.5 at theta = 0 (+Z axis facing camera)
      const theta = (u - 0.5) * Math.PI * 2;

      // 10-lobed sinusoidal pumpkin ribs
      const ribLobe = Math.cos(numRibs * theta) - 0.22 * Math.cos(numRibs * 2 * theta);
      const rRib = rBase * (1.0 + (ribAmp * ribLobe * ribFade));

      // Organic subtle asymmetry
      const asym = 1.0 + 0.025 * Math.sin(3 * theta + 1.2) * sinPhi;

      const x = rRib * Math.sin(theta) * asym;
      const z = rRib * Math.cos(theta) * asym;

      vertices.push(x, y, z);
      uvs.push(u, 1.0 - v);
    }
  }

  // Generate triangle indices
  const rowSize = radialSegments + 1;
  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * rowSize + i;
      const b = (j + 1) * rowSize + i;
      const c = (j + 1) * rowSize + (i + 1);
      const d = j * rowSize + (i + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geom.setIndex(indices);
  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  // Compute smooth analytical normals for realistic specular reflections on lobes
  geom.computeVertexNormals();

  return geom;
}

/**
 * Creates a gnarled woody pumpkin stem geometry with natural curve & flared base
 */
export function createRealisticStemGeometry(scale = 1.0) {
  const geom = new THREE.CylinderGeometry(
    scale * 0.055, // Top radius (tapered)
    scale * 0.11,  // Base radius
    scale * 0.42,  // Height
    6,             // 6-sided faceted bark
    5              // Height segments
  );

  // Deform along height to create organic backward and sideways bend
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const progress = (y + scale * 0.21) / (scale * 0.42); // 0 at bottom, 1 at top

    // Curve backwards and slightly sideways
    const bendZ = -Math.pow(progress, 1.6) * (scale * 0.16);
    const bendX = Math.sin(progress * Math.PI) * (scale * 0.04);

    // Flare out base vertices to integrate into pumpkin top dimple
    if (progress < 0.25) {
      const flare = (1.0 - progress / 0.25) * 1.5;
      pos.setX(i, pos.getX(i) * flare);
      pos.setZ(i, pos.getZ(i) * flare);
    }

    pos.setX(i, pos.getX(i) + bendX);
    pos.setZ(i, pos.getZ(i) + bendZ);
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Factory for complete Realistic 3D Pumpkin Mesh (Body, Stem, PBR Materials, Inner Flame Light)
 */
export function createRealisticPumpkinModel({
  scale = 1.0,
  includeLight = true,
  lightIntensity = 2.0,
} = {}) {
  const group = new THREE.Group();

  const textures = getPumpkinTextures();

  // Pumpkin Body PBR Material
  const bodyMaterial = new THREE.MeshStandardMaterial({
    map: textures.colorTexture,
    bumpMap: textures.bumpTexture,
    bumpScale: 0.035 * scale,
    emissiveMap: textures.emissiveTexture,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 1.8,
    roughness: 0.58,
    metalness: 0.06,
  });

  const bodyGeom = createRealisticPumpkinGeometry(scale);
  const bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
  group.add(bodyMesh);

  // Gnarled Woody Stem
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x222c15, // Olive woody bark
    roughness: 0.92,
    metalness: 0.04,
  });

  const stemGeom = createRealisticStemGeometry(scale);
  const stemMesh = new THREE.Mesh(stemGeom, stemMaterial);
  // Position stem in top dimple
  stemMesh.position.set(0, scale * 0.72, 0);
  stemMesh.rotation.y = 0.4;
  group.add(stemMesh);

  // Dynamic Inner Candle Flame Light
  let innerLight = null;
  if (includeLight) {
    innerLight = new THREE.PointLight(0xff6a00, lightIntensity, scale * 8, 1.8);
    innerLight.position.set(0, scale * 0.1, scale * 0.45);
    group.add(innerLight);
  }

  // Animation Update function
  const update = (time) => {
    if (innerLight) {
      // Natural organic candle flame flicker
      const flicker = 
        Math.sin(time * 9.2) * 0.22 +
        Math.cos(time * 17.7) * 0.14 +
        (Math.sin(time * 31.4) * 0.08);
      innerLight.intensity = Math.max(0.8, lightIntensity + flicker);
      innerLight.position.x = Math.sin(time * 4.2) * (scale * 0.04);
      innerLight.position.y = (scale * 0.1) + Math.cos(time * 5.8) * (scale * 0.03);
    }
  };

  const dispose = () => {
    bodyGeom.dispose();
    stemGeom.dispose();
    bodyMaterial.dispose();
    stemMaterial.dispose();
  };

  return {
    group,
    bodyMesh,
    stemMesh,
    innerLight,
    update,
    dispose,
  };
}
