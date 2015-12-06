using UnityEngine;
using System.Collections;

public class PaddleMoveRight : MonoBehaviour {

    public float speed = 10f;

    void Update()
    {
        Transform paddle = GetComponent<Rigidbody>().transform;
        Vector3 forward = new Vector3(0f, 0f, 5f);

        if (Input.GetKey(KeyCode.UpArrow))
        {
            if (paddle.position.z < 3.7f)
            {
                paddle.position += forward * Time.deltaTime * speed;
            }


        }
        if (Input.GetKey(KeyCode.DownArrow))
        {
            if (paddle.position.z > -3.7f)
            {
                paddle.position -= forward * Time.deltaTime * speed;
            }
        }
    }
}
