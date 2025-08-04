/**
 * Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.
 *
 * A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:
 *
 * All the visited cells of the path are 0.
 * All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
 * The length of a clear path is the number of visited cells of this path.
 *
 *
 *
 * Example 1:
 *
 * Image {@link https://assets.leetcode.com/uploads/2021/02/18/example1_1.png}
 *
 * Input: grid = [[0,1],[1,0]]
 * Output: 2
 *
 * Example 2:
 *
 * Image {@link https://assets.leetcode.com/uploads/2021/02/18/example2_1.png}
 *
 * Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
 * Output: 4
 * Example 3:
 *
 * Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
 * Output: -1
 *
 *
 * Constraints:
 *
 * n == grid.length
 * n == grid[i].length
 * 1 <= n <= 100
 * grid[i][j] is 0 or 1
 */

function getStepablePaths(
    grid: number[][],
    paths: [number, number][],
    xPosition: number,
    yPosition: number,
    w: number,
    h: number,
): [number, number][] {
    const points: [number, number][] = [];

    paths.forEach(([x, y]) => {
        if(x + xPosition >= 0 && x + xPosition <= w && y + yPosition >= 0 && y + yPosition <= h && grid[x + xPosition][y + yPosition] === 0) {
            points.push([x + xPosition, y + yPosition]);
        }
    })

    return points;
}

function shortestPathBinaryMatrix(grid: number[][]): number {
    const w = grid[0].length - 1;
    const h = grid.length - 1;
    if(grid[0][0] === 1 || grid[h][w] === 1) {
        return -1;
    }

    const stepsCountToPoint: number[][] = Array.from({length: w+1}, () => Array.from({length: h+1}, () => Infinity));

    const paths: [number, number][] = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]

    const steps: [number, number][] = [[0, 0]];
    stepsCountToPoint[0][0] = 1

    while (steps.length > 0) {
        const step = steps.shift()!;
        const stepToPoint = stepsCountToPoint[step[0]][step[1]]
        if(step[0] === w && step[1] === h) {
            return stepToPoint
        }
        const stepableNextPaths = getStepablePaths(grid, paths, step[0], step[1], w, h)
        for (const [x, y] of stepableNextPaths) {
            const stepsCountToNextPoint = stepsCountToPoint[x][y]
            if(stepsCountToNextPoint > stepToPoint + 1) {
                stepsCountToPoint[x][y] = stepToPoint + 1
                steps.push([x, y])
            }
        }
    }

    return -1
}
