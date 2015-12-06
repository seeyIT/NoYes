using UnityEngine;
using System.Collections;

public class WallReflection : MonoBehaviour {

    private float xPosition = 9.5f;
    private float zPosition = 4.5f;

    void OnTriggerEnter(Collider other)
    {
       

        if (gameObject.tag == "LeftWall")
        {
            other.transform.position = new Vector3(xPosition, other.transform.position.y, other.transform.position.z);
        }
        else if (gameObject.tag == "RightWall")
        {
            other.transform.position = new Vector3(-xPosition, other.transform.position.y, other.transform.position.z);
        }
        else if (gameObject.tag == "FrontWall")
        {
            other.transform.position = new Vector3(other.transform.position.x, other.transform.position.y, -zPosition);
        }
        else if (gameObject.tag == "BackWall")
        {
            other.transform.position = new Vector3(other.transform.position.x, other.transform.position.y, zPosition);
        }


    }	
}
