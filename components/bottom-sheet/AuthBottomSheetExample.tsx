import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthBottomSheet, AuthBottomSheetRef } from './AuthBottomSheet';

// Example content component for the bottom sheet
const ExampleContent = ({ onClose }: { onClose: () => void }) => (
  <View style={styles.exampleContent}>
    <Text style={styles.title}>Bottom Sheet Content</Text>
    <Text style={styles.description}>
      This is an example of content inside the bottom sheet. You can put any React components here.
    </Text>
    
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Action pressed')}>
        <Text style={styles.actionButtonText}>Perform Action</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Example 1: Using Imperative API with forwardRef
export const ImperativeExample = () => {
  const bottomSheetRef = useRef<AuthBottomSheetRef>(null);

  const openSheet = () => {
    bottomSheetRef.current?.open();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Imperative API Example</Text>
      
      <TouchableOpacity style={styles.triggerButton} onPress={openSheet}>
        <Text style={styles.triggerButtonText}>Open Bottom Sheet (Imperative)</Text>
      </TouchableOpacity>

      <AuthBottomSheet 
        ref={bottomSheetRef}
        onDismiss={() => console.log('Sheet dismissed via imperative API')}
        contentHeight={300}
      >
        <ExampleContent onClose={closeSheet} />
      </AuthBottomSheet>
    </View>
  );
};

// Example 2: Using Controlled Prop API
export const ControlledExample = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Controlled Prop Example</Text>
      
      <TouchableOpacity style={styles.triggerButton} onPress={openSheet}>
        <Text style={styles.triggerButtonText}>Open Bottom Sheet (Controlled)</Text>
      </TouchableOpacity>

      <AuthBottomSheet 
        isOpen={isSheetOpen}
        onDismiss={closeSheet}
        contentHeight={400}
      >
        <ExampleContent onClose={closeSheet} />
      </AuthBottomSheet>
    </View>
  );
};

// Example 3: Using with router.back() (default behavior)
export const RouterExample = () => {
  const bottomSheetRef = useRef<AuthBottomSheetRef>(null);

  const openSheet = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Router Back Example</Text>
      <Text style={styles.description}>
        This example uses the default behavior where dismissing calls router.back()
      </Text>
      
      <TouchableOpacity style={styles.triggerButton} onPress={openSheet}>
        <Text style={styles.triggerButtonText}>Open Bottom Sheet (Router)</Text>
      </TouchableOpacity>

      <AuthBottomSheet ref={bottomSheetRef}>
        <View style={styles.exampleContent}>
          <Text style={styles.title}>Router Back Example</Text>
          <Text style={styles.description}>
            Tap outside, use the handle to drag, or navigate back to dismiss.
            This will call router.back() by default.
          </Text>
        </View>
      </AuthBottomSheet>
    </View>
  );
};

// Combined example showing all patterns
export const AuthBottomSheetExamples = () => {
  return (
    <View style={styles.examplesContainer}>
      <ImperativeExample />
      <ControlledExample />
      <RouterExample />
    </View>
  );
};

const styles = StyleSheet.create({
  examplesContainer: {
    flex: 1,
    padding: 20,
    gap: 30,
  },
  container: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  triggerButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  triggerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  exampleContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#34D399',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AuthBottomSheetExamples;
