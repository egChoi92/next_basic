import Example1 from './example1';
import Example2 from './example2';
import Example3 from './example3';
import Example4 from './example4';
import Example5 from './example5';
import Example6 from './example6';
import Example7 from './example7';

export default function Context({params}: {params: {slug: string}}) {

    switch (params.slug) {
        case "1":
            return <Example1 />
            break;
        case "2":
            return <Example2 />
            break;
        case "3":
            return <Example3 />
            break;
        case "4":
            return <Example4 />
            break;
        case "5":
            return <Example5 />
            break;
        case "6":
            return <Example6 />
            break;
        case "7":
            return <Example7 />
            break;
        default:
            break;
    }
}