using UnityEngine;
using System.Collections;

public class LevelManager : MonoBehaviour {

    public void LoadLevel(string name)
    {
        Debug.Log("Level Load request" + name);
        Application.LoadLevel(name);
    }

    public void QuitGame()
    {
        Debug.Log("See you");
        Application.Quit();
    }

   
}
