import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverlayManager = () => {
    const [overlays, setOverlays] = useState([]);
    const [editOverlay, setEditOverlay] = useState(null);
    const [newOverlayData, setNewOverlayData] = useState({});

    
    const fetchOverlays = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/overlays');
            setOverlays(response.data);
        } catch (error) {
            console.error("Error fetching overlays:", error);
        }
    };


    const updateOverlay = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:5000/api/overlays/${id}`, newOverlayData);
            fetchOverlays();
            setEditOverlay(null);
        } catch (error) {
            console.error("Error updating overlay:", error);
        }
    };

   
    const deleteOverlay = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/overlays/${id}`);
            fetchOverlays();
        } catch (error) {
            console.error("Error deleting overlay:", error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
      
        if (name.startsWith('position.')) {
            const field = name.split('.')[1]; 
            setNewOverlayData({
                ...newOverlayData,
                position: {
                    ...newOverlayData.position,
                    [field]: value
                }
            });
        } else {
            setNewOverlayData({
                ...newOverlayData,
                [name]: value
            });
        }
    };

   
    useEffect(() => {
        fetchOverlays();
    }, []);

    return (
        <div className="overlay-manager container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Overlay Manager</h1>

           
            <ul className="space-y-4">
                {overlays.map((overlay) => (
                    <li key={overlay._id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
                        {editOverlay === overlay._id ? (
                            <div className="flex flex-col w-full">
                               
                                <input
                                    type="text"
                                    name="content"
                                    value={newOverlayData.content || overlay.content}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-lg mb-4 w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Overlay Content"
                                />
                                
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <input
                                        type="text"
                                        name="position.top"
                                        value={newOverlayData.position?.top || overlay.position?.top}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Top Position"
                                    />
                                    <input
                                        type="text"
                                        name="position.left"
                                        value={newOverlayData.position?.left || overlay.position?.left}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Left Position"
                                    />
                                    <input
                                        type="text"
                                        name="position.size"
                                        value={newOverlayData.position?.size || overlay.position?.size}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Size"
                                    />
                                </div>

                               
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                        onClick={() => updateOverlay(overlay._id)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                        onClick={() => setEditOverlay(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center w-full">
                                <div>
                                    <p className="text-lg text-gray-900 font-medium">{overlay.content}</p>
                                    <p className="text-sm text-gray-600">Top: {overlay.position?.top}, Left: {overlay.position?.left}, Size: {overlay.position?.size}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        onClick={() => setEditOverlay(overlay._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        onClick={() => deleteOverlay(overlay._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverlayManager;
