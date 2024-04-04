const ul = document.querySelector("ul");
const input = ul.querySelector("input");
const tagCounter = document.querySelector(".details span");

let maxTag = 10;
let tags = [];

function countTag()
{
    input.focus();
    tagCounter.innerText = maxTag - tags.length;
}

function createTag()
{
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTag();
}

function remove(element, tag)
{
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    countTag();
}

function addTag(e)
{
    if(e.key == "Enter")
    {
        let tag = e.target.value.replace(/\s+/g, ' '); // removing unwanted spaces from user tags

        if (tag.length > 1 && !tags.includes(tag)) {

            if(tags.length < 10) {

                // splitting each tag from comma
                tag.split(',').forEach(tag => {
                    // add each tag inside the array if it's not already included
                    if (!tags.includes(tag)) {
                        tags.push(tag);
                        createTag();
                    }
                });
            
                // Clear the input box after adding the tags
                input.value = "";
            }
        }        
        
    }

    countTag();
}

input.addEventListener("keyup", addTag);
const removeBtn = document.querySelector("button");
removeBtn.addEventListener("click", () => {
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li => li.remove());
    countTag();
})