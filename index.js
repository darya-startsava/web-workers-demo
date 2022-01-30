
// Without Web Worker
function showPI(k) {
    let i = 1n;
    let x = 3n * (10n ** BigInt(k));
    let pi = x;
    while (x > 0) {
        x = x * i / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
    }
    return pi / 10n ** 20n;
}

// With Web Worker
const worker = new Worker(URL.createObjectURL(new Blob(["(" + worker_function.toString() + ")()"], { type: 'text/javascript' })));

worker.onmessage = (event) => {
    console.log(event.data);
}

function worker_function() {
    function showPI(k) {
        let i = 1n;
        let x = 3n * (10n ** BigInt(k));
        let pi = x;
        while (x > 0) {
            x = x * i / ((i + 1n) * 4n);
            pi += x / (i + 2n);
            i += 2n;
        }
        return pi / 10n ** 20n;
    }
    onmessage = function (event) {
        const k = event.data;
        const result = showPI(k);
        postMessage(result);
    }
}

const inputNumber = document.getElementById('input-number');
const enterNumberButton = document.getElementById('enter-number-button');
const checkbox = document.getElementById('checkbox');

enterNumberButton.addEventListener('click', () => {
    if (checkbox.checked) {
        console.log('Calculating with Web Worker:')
        let number = +inputNumber.value;
        worker.postMessage(number + 20);
    } else {
        console.log('Calculating without Web Worker:')
        let number = +inputNumber.value;
        const result = showPI(number + 20);
        console.log(result);
    }
});


