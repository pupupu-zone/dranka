```tsx
import { Modal, useModal } from '@ui';

const Component = () => {
	const modal = useModal();

	useEffect(() => {
		modal.openModal();
	}, []);

	return (
		<Modal title="Example" {...modal}>
			<ChildComponent closeModal={modal.closeModal}>Children</ChildComponent>
		</Modal>
	);
}
```
