// app/province/page.tsx

import ProtectedRoute from '@/components/ProtectedRoute';
import ProvincePage from '@/components/ProvincePage';

const ProtectedProvincePage = () => {
  return (
    // <ProtectedRoute>
    <ProvincePage />
    // </ProtectedRoute>
  );
};

export default ProtectedProvincePage;
