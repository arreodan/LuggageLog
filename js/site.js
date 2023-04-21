function generateId() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function addNewItem(){
    // get user input
    let newItemName = document.getElementById('newItem').value    
    //create an object with that input
    let newItem = {
        itemName: newItemName,
        id: generateId(),
    };

    //add it to current array
    let itemArray = getItemData();
    itemArray.push(newItem);

    // Update the array in localStorage
    localStorage.setItem('daLuggageLog', JSON.stringify(itemArray));

    document.getElementById('newItem').value = '';
    
    displayItems();
}

function getItemData(){
    let itemData = localStorage.getItem('daLuggageLog');

    if (itemData == null){
        localStorage.setItem('daLuggageLog', JSON.stringify([]));
        bookData = localStorage.getItem('daLuggageLog'); 
        
    }
    
    let itemArray = JSON.parse(bookData);

    return itemArray;
}

function displayItems(){
    const itemRow = document.getElementById('itemRow');
    const template = document.getElementById('cardTemplate');

    itemRow.innerHTML = ''

  let itemArray = getItemData();

  for (let i = 0; i < itemArray.length; i++) {
    // Clone the card template
    let card = document.importNode(template.content, true);

    itemRow.appendChild(card);
}
}


function deleteItem(itemId) {
  let itemArray = getItemData();

  // Remove the item from the array
  itemArray = itemArray.filter(item => item.id != itemId);

  // Update the array in localStorage
  localStorage.setItem('daLuggageLog', JSON.stringify(itemArray));

  // Display the updated list
  displayItems();
}