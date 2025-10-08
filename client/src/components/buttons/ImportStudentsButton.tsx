import { IconFileCv } from '@tabler/icons-react';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import type { APIResponse } from '../../types/api-response';
import { queryClient } from '../../main';
import { QUERY_KEYS } from '../../constants';
import { FileInput } from '@mantine/core';
import { useNotification } from '../../hooks/useNotification';

export default function ImportStudentsButton() {
	const notification = useNotification();
	const icon = <IconFileCv size={18} stroke={1.5} />;
	const [loading, setIsLoading] = useState(false);

	const onSubmit = async (file: File | null) => {
		try {
			setIsLoading(true);

			const formData = new FormData();
			if (file) formData.append('students_file_csv', file);

			await axiosInstance.post<APIResponse<null>>(
				'/student/file/import',
				formData
			);

			notification({
				title: 'Students imported successfully',
				message: '',
			});
			await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STUDENTS] });
		} catch (err: any) {
			console.error('Failed to import file', err);

			notification({
				title: 'Failed to import file',
				message: err.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<FileInput
				disabled={loading}
				onChange={onSubmit}
				accept='text/csv'
				leftSection={icon}
				label='Upload a CSV file of students'
				placeholder='Your CV'
				leftSectionPointerEvents='none'
			/>
		</div>
	);
}
