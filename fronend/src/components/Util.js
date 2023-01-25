export const Loading = () => {
    <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
}

export const Alert = ({ messege }) => {
    <div className="alert alert-danger" role="alert">
        `Error! ${messege}`;
    </div>
}