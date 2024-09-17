import cls from './Something.module.scss'

export default function Something({ prop1, prop2 }) {
  return(
    <div className={cls.Something}> 
    {/* classname of container of a component starts with capital letter */}
      <h1 className={cls.mainHeader}>
        {/* classname of other elements inside container starts with small letter */}
        some text is here
      </h1>
      Some code here...
    </div>
  )
}