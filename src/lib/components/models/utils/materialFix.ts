
function computerMeshFixer(model) {
    zIndexFix(model.materials.cable_bolt_canvas);
    alphaFix(model.materials.glass);
    metalFix(model.materials.big_details);
    roughnessFix(model.materials.panel_and_bottom_details);
}

function officeMeshFixer(model) {
    console.log(model.materials['M_Lamps_CCTV_2048.001']);
    zIndexFix(model.materials['M_Lamps_CCTV_2048.001']);
    zIndexFix(model.materials.M_TapeRecorder_Tape_Rotors_Glass_1024);
}


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


export { officeMeshFixer, computerMeshFixer };

export { alphaFix, metalFix, roughnessFix, zIndexFix };
