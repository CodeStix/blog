---
description: Use this tool to convert a standard Beat Saber level into a 360 degree one!,
name: Beat-360fyer
themeColor: "#00A3FF"
thumbnails:
    - https://www.youtube.com/watch?v=OZGkLv5ajLU&t=34s
type: project
readMinutes: 10
---

<iframe width="100%" height="400px" src="https://www.youtube.com/embed/OZGkLv5ajLU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

When [Beat Saber](https://beatsaber.com/) dropped their early december update, it included 360 degree levels. These are levels that are able to rotate the platform, and the player has to follow the rotation of the platform to be able to hit the incoming blocks.

The amount of 360 levels was rather limited, only a few were included. This is the main reason I made this tool.

I began making this tool in december 2019, just a few hours after the update dropped.

## How it works

The tool iterates the standard, non-360 level per timeframe (0.1 seconds for example), for each timeframe, it does the following things:

1. **It checks if a pattern of multiple notes should cause a rotation.**
2. **It generates a rotation event if needed.**

The code for a _simple_ rotation event to the left looks like this:

```csharp
// store the left notes in the current frame (~0.1 second) in an array
BeatMapNote[] leftNotes = notesInFrame.Where((note) => (note.cutDirection == 2 || ((note.cutDirection == 4 || note.cutDirection == 6) && note.lineIndex <= 2)) && (note.type == 0 || note.type == 1)).ToArray();
// if there are more than 2 left notes and left rotation is enabled (could be disabled due to too mush rotations at once)
if (leftNotes.Length >= 2 && enableGoLeft)
{
    // set the current event direction to left
    EnsureGoLeft();
    // return (rotationAmount, shouldGenerateWall)
    return (leftNotes.All((note) => note.cutDirection == 2) ? 2 : 1, true);
}
```

This is done for each timeframe in the level. And for multiple note configurations that should create a rotation event.

3. **It removes and cuts walls that could harm the player's experience.**

For example, here's a middle wall that got removed because it is not fun when you have to step to the left and rotate at the same time!
![A middle wall got removed.](/image/beat-360fyer/cutoff.png)

4. **The tool generates a wall if the setting was enabled.**

To avoid conflicts, left walls are only placed when going left and right walls are only placed when going right. These freshly generated walls can be cut off later (step 3), if they are too long.

Here is an example of 2 walls that got generated:

![A middle wall got removed.](/image/beat-360fyer/generatedwalls.png)

## Usage

For instructions on how to use and install the tool, you must visit the [GitHub](https://github.com/CodeStix/Beat-360fyer/#beat-360fyer) page.

Enjoy!
