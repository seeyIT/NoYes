using UnityEngine;
using System.Collections;

public class MakeBody : MonoBehaviour {

    void Start()
    {
       PlayerMovement.bodyLength++;       
       PlayerMovement.listOfBodyPart.Add(gameObject);
    }
	void Update () {        
        for (int i = PlayerMovement.bodyLength - PlayerMovement.maxBodyLength; i>=0 ; i--)
        {
           Destroy(PlayerMovement.listOfBodyPart[i]);
        }
	}
    void OnTriggerEnter()
    {
        int index = PlayerMovement.listOfBodyPart.IndexOf(gameObject);
        for (int i = index;i> PlayerMovement.bodyLength-index; i--)
        {
            if (PlayerMovement.listOfBodyPart[i]!=null)
           {
               Destroy(PlayerMovement.listOfBodyPart[i]);
               PlayerMovement.maxBodyLength--;
               if (PlayerMovement.velocityForward < 10)
               {
                   PlayerMovement.velocityForward += 0.2f;
               }

               if (PlayerMovement.maxBodyLength == 1)
               { 
                   PlayerMovement.maxBodyLength = 2;
               }

           }
            else
            {
                i = 0;
            }
        }
    }
}
