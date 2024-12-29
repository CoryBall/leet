package main

import (
	"fmt"
	"slices"
	"testing"
)

func TestIsOrdered(t *testing.T) {
	arr := []int{1, 2, 3, 4}
	isOrdered, _ := IsOrdered(arr)

	if !isOrdered {
		t.Errorf("Expected %v, got %v", true, isOrdered)
	}
}

func TestIsOrderedDampenedArray(t *testing.T) {
	arr := []int{1, 2, 1, 3, 4}
	_, dampenedValues := IsOrdered(arr)

	fmt.Println(dampenedValues)

	if !slices.Contains(dampenedValues, 2) {
		t.Errorf("Expected %v, got %v", true, false)
	}
}
