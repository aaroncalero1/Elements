#pragma strict

var normalTex: Texture2D;
var hoverTex: Texture2D;

function OnMouseEnter(){
	
	guiTexture.texture = hoverTex;

}

function OnMouseExit(){
	guiTexture.texture = normalTex;

}