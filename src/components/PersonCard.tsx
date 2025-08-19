import { Person } from "../../types/person";

export default function PersonCard({ name, language, id, bio, version }: Person) {
    return (
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full px-2.5 py-1">
                    v{version}
                </span>
            </div>

            <div className="flex gap-4 mb-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Language</p>
                    <p className="font-medium text-gray-700">{language}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">ID</p>
                    <p className="font-medium text-gray-700">{id}</p>
                </div>
            </div>

            <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-3 mt-3">
                <span className="font-semibold uppercase tracking-wide">BIO:</span>
                <span>{bio}</span>
            </p>
        </div>
    );
}