using UnityEngine;
using System.Collections;

public class Ball : MonoBehaviour
{
    private Paddle paddle;
    private bool hasStarted = false;


    void Start()
    {
        paddle = GameObject.FindObjectOfType<Paddle>();
    }

    void Update()
    {
        if (!hasStarted)
        {
            // Lock the ball relative to the paddle.
            //this.transform.position = paddle.transform.position + paddleToBallVector;
            float xPos = Input.mousePosition.x/Screen.width*16;

            gameObject.transform.position = new Vector3(Mathf.Clamp(xPos,0.5f,15.5f), 2.75f, 0f);
            // Wait for a mouse press to launch.

            if (Input.GetMouseButtonDown(0))
            {
                print("Mouse clicked, launch ball");
                hasStarted = true;
                gameObject.GetComponent<Rigidbody2D>().velocity = new Vector2(2f, 10f);
            }
        }
    }
}
