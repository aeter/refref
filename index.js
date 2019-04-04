window.addEventListener("DOMContentLoaded", () => {
    new Scenery('refref').run();
});


class Scenery {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.asset_manager = new BABYLON.AssetsManager(this.scene);
    }

    run() {
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.asset_manager.onFinish = () => {
            this.make_scene();
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        };

        this.asset_manager.load();
    }
    
    
    make_scene() {   
        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), this.scene);
        camera.attachControl(this.canvas, true);

        var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 1, -1), this.scene);
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, this.scene);

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 300.0, this.scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/umhlanga_beach_4k", this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.material = skyboxMaterial;
    }
}
