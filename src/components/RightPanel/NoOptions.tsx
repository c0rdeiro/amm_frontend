import Image from 'next/image'

const NoOptions: React.FC = () => {
  return (
    <div className="pt-default-rightPanel">
      <div className="text-lg font-semibold text-primary">
        <div>Select an option</div>
        <div>to see details</div>
      </div>
      <Image
        alt="select an option"
        src="/options_details_arrow.png"
        width={80}
        height={16}
      />
    </div>
  )
}

export default NoOptions
