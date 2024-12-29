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

func readInput(filePath string) (listA, listB []int) {
	a, b := make([]int, 0), make([]int, 0)

	file, err := os.Open(filePath)
	check(err)
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		nums := s.Split(line, " ")

		numA, _ := strconv.Atoi(nums[0])
		numB, _ := strconv.Atoi(nums[len(nums)-1])

		a = append(a, numA)
		b = append(b, numB)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return a, b
}

func calculateTotalDistance(listA, listB []int) int {
	slices.Sort(listA)
	slices.Sort(listB)

	var totalDistance = 0

	for i := 0; i < len(listA); i++ {
		var distance = math.Abs(float64(listA[i] - listB[i]))
		totalDistance += int(distance)
	}

	return totalDistance
}

func calculateSimilarityScore(listA, listB []int) int {
	var similarityScore = 0

	for i := 0; i < len(listA); i++ {
		var aNum = listA[i]
		var occurrences = 0
		for i := 0; i < len(listB); i++ {
			if aNum == listB[i] {
				occurrences++
			}
		}
		similarityScore += (occurrences * aNum)
	}

	return similarityScore
}

func main() {
	listA, listB := readInput("./input")

	totalDistance := calculateTotalDistance(listA, listB)
	fmt.Println("total distance: ", totalDistance)

	similatrityScore := calculateSimilarityScore(listA, listB)
	fmt.Println("similarity score: ", similatrityScore)
}
