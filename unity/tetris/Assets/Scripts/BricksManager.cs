using UnityEngine;
using System.Collections;

public class BricksManager : MonoBehaviour
{

    public GameObject[] bricks;

    private int _randomBrick;
    private int _bricksAmount;
    private BrickParent _currentBrick;
    private GameObject _tempObj;
	void Start ()
	{
	    _bricksAmount = bricks.Length;
	    SpawnBrick();
	}

    void Update()
    {
        if (_currentBrick == null)
        {
            return;
        }

        if (Input.GetKeyUp(KeyCode.D))
        {
            _currentBrick.MoveRight();
        }
        else if (Input.GetKeyUp(KeyCode.A))
        {
            _currentBrick.MoveLeft();
        }
        else if (Input.GetKeyUp(KeyCode.Space))
        {
            _currentBrick.Rotate();
        }
        else if (Input.GetKeyUp(KeyCode.S))
        {
            _currentBrick.SpeedDown();
        }
        else if (Input.GetKeyUp(KeyCode.W))
        {
            _currentBrick.Rotate();
        }
    }

    public void SpawnBrick()
    {
        _currentBrick = null;
        _randomBrick = Random.Range(3, 4);

        _tempObj = (GameObject)Instantiate(bricks[_randomBrick], transform.position, Quaternion.identity);
        _currentBrick = _tempObj.GetComponent<BrickParent>();
    }
}
