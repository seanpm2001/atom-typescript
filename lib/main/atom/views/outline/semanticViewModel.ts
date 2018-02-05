import {NavigationTree} from "typescript/lib/protocol"
import {NavigationTreeComponent} from "./navigationTreeComponent"

export interface Props extends JSX.Props {
  navTree: NavigationTreeViewModel | null
  root?: NavigationTreeComponent | null
}

/**
 * interface for attaching some view-/representation-related fields
 * to the NavigationTree.
 */
export interface NavigationTreeViewModel extends NavigationTree {
  styleClasses: string
  childItems?: NavigationTreeViewModel[]
  /**
   * single selection model: at most one node may be selected
   * @default undefined (i.e. not selected)
   */
  selected: boolean | undefined
  /**
   * indicates if a node (whith children) should be rendered
   * expanded or collapsed.
   * @default undefined (i.e. expanded)
   */
  collapsed: boolean | undefined
}
