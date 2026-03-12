import { performance } from 'node:perf_hooks';

/**
 * University of Pittsburgh Bradford - CIST 0265
 * Homework: Real- World Performance Analysis (Starter)
 */

//Task1: Define a 'Student' interface with an id (number) and name(string)
 interface Student {
    id: number;
    name: string;
 }

 class StudentRegistry {
    //Task 2: Define a private array of Student objects
    private students: Student[] = [];
 

    addStudent(s: Student): void {
        //Task 3: Push student to the arrary
        this.students.push(s)
    }

    /**
     * Task 4: Linear Search O(n)
     * Requirement: Use a single loop to find a student by ID.
     */
    findStudentLinear(id: number): Student | undefined {
        for (const student of this.students) {
            if (student.id === id) {
                return student;
            }
        }
        return undefined
    }

    /**
     * Task 5: Quadratic Duplicate Check O(n^2)
     * Requirement: Use NESTED loops to compare every student against every other student to find if  any are duplicated 
     */
    hasDuplicateNames(): boolean {
        for (let i = 0; i <this.students.length; i++) {
            for (let j = 0; j < this.students.length; j++){
                if (i !== j && this.students[i].name === this.students[j].name) {
                    return true;
                }
            }
        }
        return false;
    } 

    /**
     * Task 6: Performance Measurement
     * Fill in the start/end timers for both algorithms
     */
     runPerformanceTest(): void {
        const testSizes = [10, 100, 1000, 5000];
        
        const results = testSizes.map(n => {
            this.students = [];
            for (let i = 0; i < n; i++) {
                this.addStudent({ id: i, name: `Student ${i}` });
            }
            // --- TIME THE LINEAR SEARCH ---
            const startLinear = performance.now();
            this.findStudentLinear(-1); // Search for something that doesn't exist to force a full scan
            const endLinear = performance.now();
            const linearTime = endLinear - startLinear;

            // --- TIME THE QUADRATIC CHECK ---
            const startQuad = performance.now();
            this.hasDuplicateNames();
            const endQuad = performance.now();
            const quadraticTime = endQuad - startQuad;

            return {
                "Input Size (n)": n.toLocaleString(),
                "Linear (ms)": linearTime.toFixed(4),
                "Quadratic (ms)": quadraticTime.toFixed(4)
            };
        });

        console.log("\n--- Lab Results: Algorithmic Growth ---");
        console.table(results);
    }
 }

const registry = new StudentRegistry();
registry.runPerformanceTest();
