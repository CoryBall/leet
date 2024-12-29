package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"slices"
	"strconv"
	s "strings"
)

func check(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

func readInput(filePath string) [][]int {
	data := make([][]int, 0)

	file, err := os.Open(filePath)
	check(err)
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		lineValues := s.Split(line, " ")

		nums := make([]int, 0)
		for i := 0; i < len(lineValues); i++ {
			num, _ := strconv.Atoi(lineValues[i])
			nums = append(nums, num)
		}

		data = append(data, nums)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return data
}

func IsOrdered(report []int, checkDampened bool) (ordered bool, removableLevels []int) {
	// true if all elements are in ascending or descending order
	removableLevels = make([]int, 0)
	isAscending, isDescending := true, true

	for i := 0; i < len(report)-1; i++ {
		if report[i] >= report[i+1] && isAscending {
			isAscending = false
		}

		if report[i] <= report[i+1] && isDescending {
			isDescending = false
		}

		if checkDampened && !isAscending && !isDescending {
			excludedArr := append(report[:i], report[i+1:]...)
			fmt.Println("found potential dampened value: ", report[i])
			fmt.Println("excluded array: ", excludedArr)
			isRemovable, _ := IsOrdered(excludedArr, false)
			if isRemovable {
				removableLevels = append(removableLevels, report[i])
			}
		}
	}

	correctlyOrdered := isAscending || isDescending
	return correctlyOrdered, removableLevels
}

func AdjacentLevelsWithinRange(report []int) (withinRange bool, removableLevels []int) {
	// true if adjacent elements are within 3 difference
	removableLevels = make([]int, 0)
	isWithinRange := true

	for i := 0; i < len(report)-1; i++ {
		diff := math.Abs(float64(report[i] - report[i+1]))
		if isWithinRange && diff > 3 || diff < 1 {
			isWithinRange = false
		}

		excludedArr := append(report[:i], report[i+1:]...)
		isRemovable, _ := AdjacentLevelsWithinRange(excludedArr)
		if isRemovable {
			removableLevels = append(removableLevels, report[i])
		}
	}

	return isWithinRange, removableLevels
}

func IsReportSafe(report []int) bool {
	isOrdered, removableOrderedIndexes := IsOrdered(report)
	isWithinRange, removableRangeIndexes := AdjacentLevelsWithinRange(report)

	dampenedIndexes := make([]int, 0)
	for i := 0; i < len(removableOrderedIndexes); i++ {
		matchingIndex := slices.Contains(removableRangeIndexes, removableOrderedIndexes[i])
		if matchingIndex {
			dampenedIndexes = append(dampenedIndexes, removableOrderedIndexes[i])
		}

	}

	isSafe := (isOrdered && isWithinRange) || len(dampenedIndexes) > 0

	return isSafe
}

func main() {
	data := readInput("./input-short")
	safeCount := 0

	for i := 0; i < len(data); i++ {
		if IsReportSafe(data[i]) {
			safeCount++
		}
	}

	fmt.Println("safe reports: ", safeCount)
}
