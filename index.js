class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}


//Similar to Singly Linked List but refers to prev node as well
class DoublyLinkedList{
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Push pseudocode
  // Create a new node with the value passed to the function
  // If the head property is null set the head and tail to be the newly created node 
  // If not, set the next property on the tail to be that node
  // Set the previous property on the newly created node to be the tail
  // Set the tail to be the newly created node
  // Increment the length
  // Return the Doubly Linked List

  push(val){
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // Popping pseudocode
  // *If there is no head, return undefined
  // *Store the current tail in a variable to return later
  // *If the length is 1, set the head and tail to be null
  // *Update the tail to be the previous Node.
  // *Set the newTail's next to null
  // *Decrement the length
  // *Return the value removed
  pop(){
    if(!this.head) return undefined;
    let poppedNode = this.tail;
    if(this.length === 1){
      this.head = null;
      this.tail = null;
    }else{
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  // Shifting pseudocode
  // *If length is 0, return undefined
  // *Store the current head property in a variable (we'll call it old head)
  // *If the length is one
  //     set the head to be null
  //     set the tail to be null
  // *Update the head to be the next of the old head
  // *Set the head's prev property to null
  // *Set the old head's next to null
  // *Decrement the length
  // *Return old head
  shift(){
    if(this.length = 0) return undefined;
    let oldHead = this.head;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }    
    this.length--;
    return oldHead;
  }

  // Unshift
  // *Create a new node with the value passed to the function
  // *If the length is 0
  //     Set the head to be the new node
  //     Set the tail to be the new node
  // *Otherwise
  //     Set the prev property on the head of the list to be the new node
  //     Set the next property on the new node to be the head property 
  //     Update the head to be the new node
  // *Increment the length
  // *Return the list  
  unshift(val){
    const newNode = new Node(val);
    if(this.length === 0){
      this.head = newNode;
      this.tail = newNode;      
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // Get Pseudocode
  // *If the index is less than 0 or greater or equal to the length, return null
  // *If the index is less than or equal to half the length of the list
  //     Loop through the list starting from the head and loop towards the middle
  //     Return the node once it is found
  // *If the index is greater than half the length of the list
  //     ​Loop through the list starting from the tail and loop towards the middle
  //     Return the node once it is found
  get(index){
    if (index < 0 || index >= this.length) return null;
    if (index <= this.length/2){
      let count =  0;
      let current = this.head;
      while(count != index) {
        current = current.next;
        count++;
      }  
      return current    
    } else {
      let count = this.length - 1;
      let current = this.tail;
      while(count != index) {
        current = current.prev;
        count--;
      }      
      return current;
    }    
  }

  // Set pseudocode
  // *Create a variable which is the result of the get method at the index passed to the function
  //     If the get method returns a valid node, set the value of that node to be the value passed to the function
  //     Return true
  // *Otherwise, return false
  set(index, val){
    const foundNode = this.get(index);
    if(foundNode != null) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  // Insert pseudocode
  // *If the index is less than zero or greater than or equal to the length return false
  // *If the index is 0, unshift
  // *If the index is the same as the length, push
  // *Use the get method to access the index -1
  // *Set the next and prev properties on the correct nodes to link everything together
  // *Increment the length 
  // *Return true
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);

    const newNode = new Node(val);
    const beforeNode = this.get(index-1);
    const afterNode = beforeNode.next;
    
    beforeNode.next = newNode, newNode.prev = beforeNode;
    newNode.next = afterNode, afterNode.prev = newNode;
    this.length++;
    return true;
  }

  // Remove pseudocode
  // *If the index is less than zero or greater than or equal to the length return undefined
  // *If the index is 0, shift
  // *If the index is the same as the length-1, pop
  // *Use the get method to retrieve the item to be removed
  // *Update the next and prev properties to remove the found node from the list
  // *Set next and prev to null on the found node
  // *Decrement the length
  // *Return the removed node.
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    
    const removedNode = this.get(index);
    const beforeNode = removedNode.prev;
    const afterNode = removedNode.next;

    beforeNode.next = afterNode, afterNode.prev = beforeNode;
    removedNode.next = null, removedNode.prev = null;
    this.length--;
    return removedNode;
  }

  print(){
    var arr = [];
    var current = this.head
    while(current){
        arr.push(current.val)
        current = current.next
    }
    console.log(arr);
  }

  // Reverse pseudocode
  // If the list is empty return undefined
  // Switch the head and tail
  // Loop through list
  // Switch prev and next on each node
  // return list
  reverse() {
    if (!this.head) return undefined;

    let current = this.head;
    this.head = this.tail;
    this.tail = current;
    
    let prev = null;
    let next;
    while(current) {
      next = current.next;
      current.prev = next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return this;
  }  
}
const list = new DoublyLinkedList;

list.push("Cat");
list.push("Dog");
list.push("Fish");
list.push("Cow");

console.log(list);list