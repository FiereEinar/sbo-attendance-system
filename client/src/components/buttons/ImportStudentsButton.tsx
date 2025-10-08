import { IconFileCv } from '@tabler/icons-react';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import type { APIResponse } from '../../types/api-response';
import { queryClient } from '../../main';
import { QUERY_KEYS } from '../../constants';
import { FileInput } from '@mantine/core';

export default function ImportStudentsButton() {
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

			await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STUDENTS] });
		} catch (err: any) {
			console.error('Failed to import file', err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<FileInput
				disabled={loading}
				onChange={onSubmit}
				leftSection={icon}
				label='Upload a CSV file of students'
				placeholder='Your CV'
				leftSectionPointerEvents='none'
			/>
		</div>
	);
}
