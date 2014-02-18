#pragma strict

function OnCollisionEnter(collision : Collision) {
Debug.Log('hola');
	if(collision.collider.name.Contains('Clone')) {
		var icanmove : move2 = this.gameObject.GetComponent('move2');
		var itcanmove : move2 = collision.gameObject.GetComponent('move2');
		if(!icanmove.canMove && !itcanmove.canMove){
		Debug.Log('destroy');
			Destroy(collision.gameObject);
			Destroy(this.gameObject);
		}

		var contact : ContactPoint = collision.contacts[0];
		var normal = contact.normal;
		var m1:move2 = this.GetComponent(move2);

		var reflectionDirection : Vector3 = Vector3.Reflect(m1.direction, normal);
		m1.direction = reflectionDirection;
	}
}