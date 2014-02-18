var target : Transform;		// Object that this label should follow
var offset = Vector3.zero;	// Units in world space to offset; 1 unit above object by default
var clampBorderSize = .05;	// How much viewport space to leave at the borders when a label is being clamped
var cam : Camera;	// Only use this if useMainCamera is false
private var thisTransform : Transform;
private var camTransform : Transform;
private var clampToScreen = true;	// If true, label will be visible even if object is off screen
 
function Start () {
	thisTransform = transform;
	camTransform = cam.transform;
}
 
function Update () {
	if (clampToScreen) {
		var relativePosition = camTransform.InverseTransformPoint(target.position);
		relativePosition.z = Mathf.Max(relativePosition.z, 1.0);
		thisTransform.position = cam.WorldToViewportPoint(camTransform.TransformPoint(relativePosition + offset));
		thisTransform.position = Vector3(Mathf.Clamp(thisTransform.position.x, clampBorderSize, 1.0-clampBorderSize),
										 Mathf.Clamp(thisTransform.position.y, clampBorderSize, 1.0-clampBorderSize),
										 thisTransform.position.z);
	}
	else {
		thisTransform.position = cam.WorldToViewportPoint(target.position + offset);
	}
}
 
@script RequireComponent(GUIText)