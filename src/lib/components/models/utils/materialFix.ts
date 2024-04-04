
function alphaFix(material) {
    material.depthWrite = true;
    material.depthTest = true;
    material.opacity = 1;
    material.alphaToCoverage = true;
    material.blending = 0;
    console.log(material);
}
function metalFix(material) {
    
    material.metalness = 0.2;
    material.roughness = 0.5;
    
}
function roughnessFix(material) {
    material.roughness = 1;
    material.metalness = 0.9;
    material.metalnessMap.anisotropy = 1;
    material.emissive.b = 50
    material.emissive.r = 50
    material.emissiveIntensity = 50
    material.emissiveIntensity = 0;
    console.log(material)
}
function zIndexFix(material) {
    material.depthWrite = true;
    material.depthTest = true;
}

export { alphaFix, metalFix, roughnessFix, zIndexFix };
