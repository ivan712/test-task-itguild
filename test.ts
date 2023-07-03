interface O {
    aa: number;
}

const aaa: string = '{"aa":"1"}'
const a: O = JSON.parse(aaa);

console.log(a)