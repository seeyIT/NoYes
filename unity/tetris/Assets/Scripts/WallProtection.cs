using UnityEngine;
using System.Collections;

public class WallProtection : MonoBehaviour {

    private void OnTriggerExit2D(Collider2D collider)
    {
        if (collider.transform.position.x > 0)
        {
            collider.transform.parent.transform.position += new Vector3(-1,0);
        }
        else
        {
            collider.transform.parent.transform.position += new Vector3(1, 0);

        }
    }

}
