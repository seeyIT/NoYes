using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;


public class LinesManager : MonoBehaviour
{

    private static List<Line> _bricks;
    private static int[] _lineBricksCounter;

	void Start () {
        _bricks = new List<Line>();

	    _lineBricksCounter = new int[32];

	    for (int i = 0; i < 32; ++i)
	    {
	        _lineBricksCounter[i] = 0;
	    }
	}
	
    // 19 max line length
    public static void AddElement(int index, Brick brick)
    {
        _bricks.Add(new Line
        {
            Index = index,
            Brick = brick
        });
        _lineBricksCounter[index]++;
    }

    public static void CheckCompleteLine()
    {
        for (int i = 0; i < 32; ++i)
        {
            if (_lineBricksCounter[i] >= 19)
            {
                ClearLine(i);
                _lineBricksCounter[i] = 0;
                for (int j = i+1; j < 32; ++j)
                {

                    MoveDownLine(j);
                    _lineBricksCounter[j - 1] = _lineBricksCounter[j];
                }
                --i;
            }
        }
    }

    private static void ClearLine(int index)
    {
        int _length = _bricks.Count;
        for (int i = 0; i < _length; ++i)
        {
            if (_bricks[i].Index == index)
            {
                _bricks[i].Index = -1;

                Destroy(_bricks[i].Brick.gameObject);
            }
        }

        Debug.Log("Points add !!");
    }

    private static void MoveDownLine(int index)
    {
        int _length = _bricks.Count;
        for (int i = 0; i < _length; ++i)
        {
            if (_bricks[i].Index == index)
            {
                _bricks[i].Index--;
                _bricks[i].Brick.transform.position += new Vector3(0,-1,0);
            }
        }
    }
}

public class Line
{
    public int Index { get; set; }
    public Brick Brick { get; set; }
}
