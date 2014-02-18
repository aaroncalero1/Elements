#pragma strict

var direction: Vector3;
var speed :float;
var canMove:boolean=false;
var cam : GameObject;
var touchNumber: int;
var timeToLive: float;
var lived: float =0;
var text: GUITexture;
var txt : GUITexture;
function Start(){
	direction = new Vector3(Random.Range(-10.0,10.0),Random.Range(-10.0,10.0),Random.Range(-10.0,10.0));
	//set following floating text:
	txt = Instantiate(text,cam.camera.WorldToViewportPoint(transform.position),Quaternion.identity);
	var txtfollow: follow = txt.gameObject.AddComponent("follow");
	txtfollow.target = transform;
	txtfollow.cam = cam.camera;   
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape)){
		Application.Quit();
	}
	if (Input.GetKeyDown(KeyCode.Menu)){	
		Application.LoadLevel("pause");
	}
	lived +=Time.deltaTime;
	if(lived>timeToLive){
		Destroy(this.gameObject);
	}

//Version para android:		
	if(Input.touchCount > 0 ) {
		var index: int =0; 
		for(var touch : Touch in Input.touches){
			var hit : RaycastHit;
			var vektor = Vector3(Input.GetTouch(index).position.x,Input.GetTouch(index).position.y,0f);
			var ray : Ray = cam.camera.ScreenPointToRay (vektor);
			
			if (Physics.Raycast(ray, hit, Mathf.Infinity)) {
				if(hit.collider.gameObject === this.gameObject) {   
				  canMove=true;
				  this.touchNumber = index;
				}                          
			}
			index++;
		}		
	} 
	
//Version para pc:
//	if(Input.GetMouseButtonDown(0) ) {
//		var index: int =0; 
//		var hit : RaycastHit;
//		var vektor = Vector3(Input.mousePosition.x,Input.mousePosition.y,0f);
//		var ray : Ray = cam.camera.ScreenPointToRay (vektor);
//		
//		if (Physics.Raycast(ray, hit, Mathf.Infinity)) {
//			if(hit.collider.gameObject === this.gameObject) {    
//			  canMove=true;
//			  this.touchNumber = index;
//			}                          
//		}		
//	}
	
	if(!canMove){
		var newDir = new Vector3(Random.Range(direction[0]-0.2,direction[0]+0.2),
								 Random.Range(direction[1]-0.2,direction[1]+0.2),
								 Random.Range(direction[2]-0.2,direction[2]+0.2));
		direction = newDir/newDir.magnitude;
	
		var myPosition = transform.position;	
		if((myPosition.x>8 && direction.x>=0) || (myPosition.x<-8 && direction.x<=0)){
			direction.x=-direction.x;
		}
		if((myPosition.y>4 && direction.y>=0) || (myPosition.y<-4 && direction.y<=0)){
			direction.y=-direction.y;
		}
		if((myPosition.z>6 && direction.z>=0) || (myPosition.z<-6 && direction.z<=0)){
			direction.z=-direction.z;
		}
	
		transform.position=transform.position+speed*direction/direction.magnitude*Time.deltaTime;
	
		transform.rotation = new Quaternion(Random.Range(transform.rotation.x-0.1,transform.rotation.x+0.1),
											Random.Range(transform.rotation.y-0.1,transform.rotation.y+0.1),
											Random.Range(transform.rotation.z-0.1,transform.rotation.z+0.1),
											Random.Range(transform.rotation.w-0.1,transform.rotation.w+0.1));
	}

//Version Para android:
	if(canMove){
		var theLine : Ray=cam.camera.ScreenPointToRay(Input.GetTouch(this.touchNumber).position);
		var newPos : Vector3 = theLine.GetPoint(5);
		this.transform.position=newPos;
	}

	if(canMove && Input.GetTouch(this.touchNumber).phase == TouchPhase.Ended){
		var screenPos = cam.camera.WorldToScreenPoint(transform.position);
		if(screenPos.x<=48 && screenPos.y <=64){
			Destroy(this.gameObject);
		}
		canMove=false;
	    direction = new Vector3(Random.Range(-10.0,10.0),Random.Range(-10.0,10.0),Random.Range(-10.0,10.0));
	}
	
//Version de test para pc:	
//	if(canMove){
//		var theLine : Ray=cam.camera.ScreenPointToRay(Input.mousePosition);
//		var newPos : Vector3 = theLine.GetPoint(5);
//		this.transform.position=newPos;
//	}
//
//	if(canMove && Input.GetMouseButtonUp(0)){
//		var screenPos = cam.camera.WorldToScreenPoint(transform.position);
//		if(screenPos.x<=48 && screenPos.y <=64){
//			Destroy(this.gameObject);
//		}
//		canMove=false;
//	    direction = new Vector3(Random.Range(-10.0,10.0),Random.Range(-10.0,10.0),Random.Range(-10.0,10.0));
//	}
}