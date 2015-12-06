using UnityEngine;
using System.Collections;
using System.Collections.Generic;
public class PlayerMovement : MonoBehaviour {
    
    public Rigidbody head;
    public Rigidbody spawnBody;
    public Transform spawnPosition;
    
    public static List<GameObject> listOfBodyPart =  new List<GameObject>();
    public static int bodyLength=0;
    public static int maxBodyLength = 3;
    public static float velocityForward = 10f;

	void Start ()
    {
        Move();
	}
	
	void Update ()
    {
        
        
        if (Input.GetKeyUp(KeyCode.A) || Input.GetKeyUp(KeyCode.LeftArrow))
        {            
            Turn(270);            
        }

       
        if (Input.GetKeyUp(KeyCode.D) || Input.GetKeyUp(KeyCode.RightArrow))
        {
            Turn(90);
        }

        
	}
    void Move()
    {
        transform.position += (transform.forward/2);
        GameObject body;
        body = Instantiate(spawnBody, spawnPosition.position, Quaternion.identity) as GameObject;
        Invoke("Move",velocityForward*Time.deltaTime);
        
    }
   
    void Turn(int value)
    {
        float yAxis = transform.rotation.y + value;
        yAxis = SetCorrectRotation(yAxis);
        Quaternion turn = new Quaternion();
        turn = Quaternion.Euler(0f, yAxis, 0f);        
        head.MoveRotation(head.transform.rotation * turn);
        
    }
   
    float SetCorrectRotation(float value)
    {

        if (value < 10)
        {
            return 0;
        }
        if (value < 100)
        {
            return 90;
        }
        if (value < 190)
        {
            return 180;
        }
        if (value < 280)
        {
            return 270;
        }
        return 0;
    }
}
