# Kanban Board 🗂️

![kanban](https://github.com/oluzr/kanban/assets/94340943/4cc3b364-8594-4657-9e5c-9e290534cc7a)

## drag and drop

- `react-beautiful-dnd` 라이브러리 활용

```javascript
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

<DragDropContext onDragEnd={onDragEnd}>
  ...
  <Droppable key={todoStatus} droppableId={todoStatus}>
    ...
    <Draggable>
      {(provided) => (
        <CardItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card item={carditem} />
        </CardItem>
      )}
    </Draggable>
  </Droppable>
</DragDropContext>;
```

- 키보드 동작 (접근:`tap` 선택:`space` 이동:`방향키`)

![kanban key](https://github.com/oluzr/kanban/assets/94340943/e852f485-24cc-4f78-9c12-041947f1981b)

## Styles

- `CSS-in-JS`
  - `Styled Components` 라이브러리 활용
- `tailwindcss`, `daisyui` 활용
