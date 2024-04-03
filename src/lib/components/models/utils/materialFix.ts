
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
    console.log(material)
}
function roughnessFix(material) {
    material.roughness = 0;
}
function zIndexFix(material) {
    material.depthWrite = true;
    material.depthTest = true;
}

export { alphaFix, metalFix, roughnessFix, zIndexFix };
