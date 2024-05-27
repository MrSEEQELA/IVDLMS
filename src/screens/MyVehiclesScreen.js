import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const MyVehiclesScreen = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:3001/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        // Handle error
      }
    };

    fetchVehicles();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{item.registration_number}</Text>
              {/* Add more vehicle information here */}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

export default MyVehiclesScreen;

