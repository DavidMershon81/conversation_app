import { useLocation } from 'react-router-dom';

const TestVariablePaths = ({basePath}) => {
    const location = useLocation();
    const testPath = location.pathname.replace(basePath, '');

    return (
        <section>
            <h3>Testing Variable Paths</h3>
            <p>subpath: {testPath} </p>
        </section>
    );
}

export default TestVariablePaths;