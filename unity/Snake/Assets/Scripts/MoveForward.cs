using UnityEngine;
using System.Collections;

public class MoveForward : MonoBehaviour {

    public float speed = 10f;
    Transform playerPosition;
	
    void Start()
    {
        playerPosition = GameObject.FindGameObjectWithTag("Player").transform;

    }
	
	void Update () {
        float playerZ = playerPosition.position.z;
        float positionZ = transform.position.z;
        float playerX = playerPosition.position.x;
        float positionX = transform.position.x;

        GetComponent<Rigidbody>().transform.position = new Vector3((Mathf.Lerp(positionX, playerX, Time.deltaTime * speed)), transform.position.y, (Mathf.Lerp(positionZ, playerZ, Time.deltaTime * speed)));
	}
}
