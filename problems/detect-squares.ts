/**
 * You are given a stream of points on the X-Y plane. Design an algorithm that:
 *
 * Adds new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.
 * Given a query point, counts the number of ways to choose three points from the data structure such that the three points and the query point form an axis-aligned square with positive area.
 * An axis-aligned square is a square whose edges are all the same length and are either parallel or perpendicular to the x-axis and y-axis.
 *
 * Implement the DetectSquares class:
 *
 * DetectSquares() Initializes the object with an empty data structure.
 * void add(int[] point) Adds a new point point = [x, y] to the data structure.
 * int count(int[] point) Counts the number of ways to form axis-aligned squares with point point = [x, y] as described above.
 *
 *
 * Example 1:
 *
 * Image {@link https://assets.leetcode.com/uploads/2021/09/01/image.png}
 *
 * Input
 * ["DetectSquares", "add", "add", "add", "count", "count", "add", "count"]
 * [[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]]
 * Output
 * [null, null, null, null, 1, 0, null, 2]
 *
 * Explanation
 * DetectSquares detectSquares = new DetectSquares();
 * detectSquares.add([3, 10]);
 * detectSquares.add([11, 2]);
 * detectSquares.add([3, 2]);
 * detectSquares.count([11, 10]); // return 1. You can choose:
 *                                //   - The first, second, and third points
 * detectSquares.count([14, 8]);  // return 0. The query point cannot form a square with any points in the data structure.
 * detectSquares.add([11, 2]);    // Adding duplicate points is allowed.
 * detectSquares.count([11, 10]); // return 2. You can choose:
 *                                //   - The first, second, and third points
 *                                //   - The first, third, and fourth points
 *
 *
 * Constraints:
 *
 * point.length == 2
 * 0 <= x, y <= 1000
 * At most 3000 calls in total will be made to add and count.
 */

type Point = [number, number];

class DetectSquares {
    private xPoints = new Map<number, Map<number, number>>();

    constructor() {
    }

    add(point: Point): void {
        this.setToMemory(point);
    }

    private setToMemory([x, y]: Point): void {
        if (!this.xPoints.has(x)) {
            this.xPoints.set(x, new Map());
        }
        this.xPoints.get(x)!.set(y, (this.xPoints.get(x)!.get(y) ?? 0) + 1);
    }

    count(point: Point): number {
        if (!this.xPoints.has(point[0])) {
            return 0;
        }
        let count = 0;
        this.xPoints.get(point[0])!.forEach((siblingPointCount, yPosition) => {
            if(yPosition === point[1]) {
                return;
            }
            const distance = Math.abs(point[1] - yPosition);
            const left = point[0] - distance;
            const right = point[0] + distance;

            [
                [[left, point[1]], [left, yPosition]],
                [[right, point[1]], [right, yPosition]]
            ].forEach(([up, down]) => {
                const upSide = this.getPointCount(up as Point);
                const downSide = this.getPointCount(down as Point)

                if(upSide > 0 && downSide > 0) {
                    count += (upSide * downSide) * (siblingPointCount);
                }
            })
        });

        return count;
    }

    private getPointCount(point: Point): number {
        return this.xPoints.get(point[0])?.get(point[1]) ?? 0;
    }
}
