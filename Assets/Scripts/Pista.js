var normalTex: Texture2D;
var hoverTex: Texture2D;

function OnMouseDown(){
	if(this.gameObject.guiTexture.texture == normalTex){
		this.gameObject.guiTexture.texture = hoverTex;
		this.gameObject.guiTexture.pixelInset.y = -hoverTex.height;
		this.gameObject.guiTexture.pixelInset.width = hoverTex.width;
		this.gameObject.guiTexture.pixelInset.height = hoverTex.height;
	} else {
		this.gameObject.guiTexture.texture = normalTex;
		this.gameObject.guiTexture.pixelInset.y = -normalTex.height;
		this.gameObject.guiTexture.pixelInset.width = normalTex.width;
		this.gameObject.guiTexture.pixelInset.height = normalTex.height;
    }
}