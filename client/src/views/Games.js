import React from 'react';
import { Link } from '@reach/router';

export default () => {
    return (
        <>
            <h1 className="text-center">Available Games</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Creator</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Player 1</td>
                        <td><Link className="btn btn-info" to={`/games/1`}>Join</Link></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}