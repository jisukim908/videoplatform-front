window.onload = async function loadTag() {
    console.log("콘솔 불러오기")
    const response = await fetch('http://127.0.0.1:8000/users/tag/', {
        method : 'GET'
    });

    response_json = await response.json()
    const tags = document.getElementById("tags")

    response_json.forEach(tag => {
        const newInput = document.createElement('input')
        newInput.setAttribute("type", "checkbox")
        newInput.setAttribute("name", "tag")
        newInput.setAttribute("value", tag['id'])
        const newTag = document.createElement('label')
        newTag.setAttribute("class", "tag-input")
        newTag.innerText = tag['name']
        tags.appendChild(newTag).appendChild(newInput)
    })

}

async function handleSignUp() {
    const query = 'input[name="tag"]:checked';
    const selectedEls = document.querySelectorAll(query)
    const tag = []
    selectedEls.forEach((el) => {
        tag.push(parseInt(el.value))
    })
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "username": username,
            "tags": tag,
        })
    })
    console.log(response)
    location.href = 'login.html';
}