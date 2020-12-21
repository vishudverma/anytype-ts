import * as React from 'react';
import { I } from 'ts/lib';
import { Icon } from 'ts/component';
import { SortableContainer } from 'react-sortable-hoc';
import { observer } from 'mobx-react';

import Cell from './cell';

interface Props extends I.ViewComponent {
	onCellAdd(e: any): void;
	onSortEnd(result: any): void;
	onResizeStart(e: any, key: string): void;
};

const $ = require('jquery');

@observer
class HeadRow extends React.Component<Props, {}> {

	render () {
		const { block, readOnly, getView, onCellAdd, onSortEnd, onResizeStart } = this.props;
		const view = getView();
		const relations = view.relations.filter((it: any) => { return it.isVisible; });

		const Row = SortableContainer((item: any) => (
			<tr className="row">
				{relations.map((relation: any, i: number) => (
					<Cell 
						key={'grid-head-' + relation.relationKey} 
						index={i} 
						{...relation}
						onResizeStart={onResizeStart} 
					/>
				))}
				<th className="cellHead last">
					{!readOnly ? <Icon id="cell-add" className="plus" onClick={onCellAdd} /> : ''}
				</th>
			</tr>
		));

		return (
			<Row 
				axis="x" 
				lockAxis="x"
				lockToContainerEdges={true}
				transitionDuration={150}
				distance={10}
				useDragHandle={true}
				onSortEnd={onSortEnd}
				helperClass="isDragging"
				helperContainer={() => { return $('#block-' + block.id + ' .wrap').get(0); }}
			/>
		);
	};

};

export default HeadRow;