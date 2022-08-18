import s from './tronBar.module.css';

type TronBarProps = {

}

// The <TronBar /> is like a progress indicator with a personality. It sits at the
// very top of the page and spans the full width of the window, so it can make
// use of 100% of the x axis to do its thing.
export const TronBar = (props: TronBarProps) => {
  return (
    <div className={s.bar} />
  )
}